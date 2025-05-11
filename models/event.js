import db from '../database.js';

export function createEvent({ title, description, address, date, user_id }) {
  const stmt = db.prepare('INSERT INTO events (title, description, address, date, user_id) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(title, description, address, date, user_id);
  return { id: info.lastInsertRowid, title, description, address, date, user_id };
}

export function editEvent(id, { title, description, address, date }) {
  const stmt = db.prepare('UPDATE events SET title = ?, description = ?, address = ?, date = ? WHERE id = ?');
  const info = stmt.run(title, description, address, date, id);
  return info.changes > 0;
}

export function deleteEvent(id) {
  const stmt = db.prepare('DELETE FROM events WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function getAllEvents() {
  const stmt = db.prepare('SELECT * FROM events');
  return stmt.all();
}

export function getEventById(id) {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  return stmt.get(id);
}
