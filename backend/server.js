const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mysql = require("mysql2");
const cors = require("cors");

// 🔧 Подключение к MySQL
const db = mysql.createConnection({
  host: "185.248.101.137",
  user: "gs32752",
  password: "cvYpNP6EVV",
  database: "gs32752",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Подключено к MySQL!");
});

const app = express();

// 🌍 Настройка CORS (Разрешаем запросы с Netlify)
app.use(
  cors({
    origin: "https://hvhzone.netlify.app", // ✅ Укажи URL фронтенда
    credentials: true, // ✅ Разрешаем куки и сессии
  })
);

// 🔐 Настройка сессий
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // ✅ Нужно для HTTPS
      sameSite: "none", // ✅ Позволяет кросс-доменные куки
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔑 Настройка Steam авторизации
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

// 🚀 Авторизация через Steam
app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://hvhzone.netlify.app"); // ✅ После входа редирект на сайт
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
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      name: req.user.displayName,
      avatar: req.user.photos[0].value, // ✅ Отправляем аватарку Steam
    });
  } else {
    res.json(null);
  }
});

// 📊 Получение статистики
app.get("/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS players FROM lvl_base", (err, result) => {
    if (err) throw err;
    stats.players = result[0].players;

    const last24Hours = Math.floor(Date.now() / 1000) - 86400;
    db.query(
      "SELECT COUNT(*) AS recent_players FROM lvl_base WHERE lastconnect >= ?",
      [last24Hours],
      (err, result) => {
        if (err) throw err;
        stats.recent_players = result[0].recent_players;

        db.query("SELECT (COUNT(*) - 1) AS admins FROM as_admins", (err, result) => {
          if (err) throw err;
          stats.admins = result[0].admins;

          db.query(
            "SELECT (SELECT COUNT(*) FROM iks_bans) + (SELECT COUNT(*) FROM as_punishments WHERE punish_type = 0) AS bans",
            (err, result) => {
              if (err) throw err;
              stats.bans = result[0].bans;

              res.json(stats);
            }
          );
        });
      }
    );
  });
});

// 🌐 Запуск сервера
app.listen(3000, () => console.log("🚀 Сервер запущен на порту 3000"));
