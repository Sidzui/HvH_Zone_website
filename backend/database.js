require("dotenv").config();
const mysql = require("mysql2");

// Подключение к базе данных
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Ошибка подключения к MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Подключено к MySQL!");
});

module.exports = db;
