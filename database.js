import Database from 'better-sqlite3';

const db = new Database('database.sqlite', { verbose: console.log });

// Tabelle für Benutzer anlegen, falls sie noch nicht existiert
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  )
`).run();

// Tabelle für Events anlegen, falls sie noch nicht existiert
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    address TEXT,
    date TEXT
  )
`).run();

export default db;
