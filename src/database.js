import initSqlJs from 'sql.js';

// مقداردهی دیتابیس SQLite
export async function initializeDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // مثال: ایجاد یک جدول کاربران
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);

  return db;
}