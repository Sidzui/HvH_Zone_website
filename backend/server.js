require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const db = require("./database"); // Используем подключение к MySQL из database.js

const app = express();

// 🌍 Разрешаем CORS (чтобы Netlify мог делать запросы)
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// 🔐 Настроим сессии
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Должно быть `true`, если используешь HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BACKEND_URL}/auth/steam/return`,
      realm: process.env.BACKEND_URL,
      apiKey: process.env.STEAM_API_KEY,
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
    res.redirect(process.env.FRONTEND_URL);
  }
);

// 🔐 Получение данных пользователя
app.get("/user", (req, res) => {
  res.json(req.user || null);
});

// 🚪 Выход
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
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

        db.query(
          "SELECT (SELECT COUNT(*) FROM iks_admins) + (SELECT COUNT(*) FROM as_admins) - 2 AS admins",
          (err, result) => {
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
          }
        );
      }
    );
  });
});

// 🌐 Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
