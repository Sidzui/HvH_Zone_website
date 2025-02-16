const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mysql = require("mysql2/promise"); // ✅ Используем Promise API
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

// 🌍 Разрешаем CORS
app.use(
  cors({
    origin: "https://hvhzone.ru",
    credentials: true, // ✅ Разрешаем кросс-доменные куки
  })
);

// 🔧 Подключение к MySQL
const db = mysql.createPool({
  host: "185.248.101.137",
  user: "gs32752",
  password: "cvYpNP6EVV",
  database: "gs32752",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then(() => console.log("✅ Подключено к MySQL!"))
  .catch((err) => console.error("❌ Ошибка подключения к MySQL:", err));

// 🔐 Хранилище сессий в MySQL
const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: true,       // ✅ Должно быть true, так как HTTPS
      sameSite: "lax",    // 🔥 Исправляем на `lax`, чтобы куки работали правильно
      httpOnly: true,
    },    
  })
);


app.use(passport.initialize());
app.use(passport.session());

// 🔑 Steam Авторизация
passport.use(
  new SteamStrategy(
    {
      returnURL: "https://hvhzone.ru/auth/steam/return",
      realm: "https://hvhzone.ru/",
      apiKey: "37AAEFA9747FBE0916081BF5F3829EC0",
    },
    function (identifier, profile, done) {
      profile.identifier = identifier;
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// 🚀 Вход через Steam
app.get("/auth/steam", passport.authenticate("steam"));


app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    console.log("✅ Пользователь авторизован:", req.user);
    console.log("🔍 Получен запрос на /auth/steam/return");
    console.log("🔍 Сессия после входа:", req.session);
    console.log("🔍 Пользователь после входа:", req.user);
    res.redirect("https://hvhzone.ru"); // ✅ После входа редирект
  }
);

// 🔄 Выход
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://hvhzone.ru");
  });
});

// 👤 Получение данных пользователя
app.get("/user", (req, res) => {
  console.log("🔍 Сессия:", req.session); // ✅ Лог сессии
  console.log("🔍 Пользователь:", req.user);

  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      name: req.user.displayName,
      avatar: req.user.photos[0].value,
    });
  } else {
    res.json(null);
  }
});


// 📊 Получение статистики
app.get("/stats", async (req, res) => {
  try {
    const [players] = await db.query("SELECT COUNT(*) AS players FROM lvl_base");
    const last24Hours = Math.floor(Date.now() / 1000) - 86400;
    const [recent_players] = await db.query(
      "SELECT COUNT(*) AS recent_players FROM lvl_base WHERE lastconnect >= ?",
      [last24Hours]
    );
    const [admins] = await db.query("SELECT (COUNT(*) - 1) AS admins FROM as_admins");
    const [bans] = await db.query(
      "SELECT (SELECT COUNT(*) FROM iks_bans) + (SELECT COUNT(*) FROM as_punishments WHERE punish_type = 0) AS bans"
    );

    res.json({
      players: players[0].players,
      recent_players: recent_players[0].recent_players,
      admins: admins[0].admins,
      bans: bans[0].bans,
    });
  } catch (err) {
    console.error("❌ Ошибка при получении статистики:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// 🌐 Запуск сервера
app.listen(3000, () => console.log("🚀 Сервер запущен на порту 3000"));
