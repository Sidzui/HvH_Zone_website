const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mysql = require("mysql2/promise"); // Используем promise-версию
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

// 🌍 Разрешаем CORS для Netlify
app.use(
  cors({
    origin: "https://hvhzone.netlify.app",
    credentials: true,
  })
);

// 🔧 Подключение к MySQL с promise API
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
      secure: false, // 🔧 Сделай false для тестов, true для HTTPS
      sameSite: "lax", // 🔧 Попробуй lax, если проблемы с кросс-доменными куками
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔑 Steam Авторизация
passport.use(
  new SteamStrategy(
    {
      returnURL: "https://hvh-zone-website.onrender.com/auth/steam/return",
      realm: "https://hvh-zone-website.onrender.com/",
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
    res.redirect("https://hvhzone.netlify.app"); // ✅ После входа редирект
  }
);

// 🔄 Выход
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://hvhzone.netlify.app");
  });
});

// 👤 Получение данных пользователя
app.get("/user", (req, res) => {
  console.log("User:", req.user);
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
    console.error("Ошибка при получении статистики:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// 🌐 Запуск сервера
app.listen(3000, () => console.log("🚀 Сервер запущен на порту 3000"));
