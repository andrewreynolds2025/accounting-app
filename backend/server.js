const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key';

// تنظیمات دیتابیس SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ثبت‌نام کاربر
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // بررسی وجود کاربر
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'کاربر با این ایمیل وجود دارد.' });
    }

    // رمزنگاری رمز عبور
    const hashedPassword = bcrypt.hashSync(password, 10);

    // ذخیره در دیتابیس
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ message: 'خطا در ثبت‌نام.' });
      }
      res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد.' });
    });
  });
});

// ورود کاربر
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // بررسی کاربر در دیتابیس
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (!row) {
      return res.status(400).json({ message: 'ایمیل یا رمز عبور اشتباه است.' });
    }

    // بررسی رمز عبور
    const isValidPassword = bcrypt.compareSync(password, row.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'ایمیل یا رمز عبور اشتباه است.' });
    }

    // ایجاد توکن
    const token = jwt.sign({ id: row.id, email: row.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'ورود موفقیت‌آمیز.', token });
  });
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});