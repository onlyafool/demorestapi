import db from '../database.js';

export function createEvent({ title, description, address, date, image, user_id }) {
  const stmt = db.prepare('INSERT INTO events (title, description, address, date, image, user_id) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(title, description, address, date, image, user_id);
  return { id: info.lastInsertRowid, title, description, address, date, image, user_id };
}

  export function editEvent(id, { title, description, address, date, image }) {
  const stmt = db.prepare('UPDATE events SET title = ?, description = ?, address = ?, date = ?, image = ? WHERE id = ?');
  const info = stmt.run(title, description, address, date, image, id);
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

export function registerUserForEvent(eventId, userId) {
  const stmt = db.prepare('INSERT INTO registrations (event_id, user_id) VALUES (?, ?)');
  const info = stmt.run(eventId, userId);
  return info.changes > 0;
}

export function unregisterUserFromEvent(eventId, userId) {
  const stmt = db.prepare('DELETE FROM registrations WHERE event_id = ? AND user_id = ?');
  const info = stmt.run(eventId, userId);
  return info.changes > 0;  
}