import db from '../database.js';
import bcrypt from 'bcryptjs';

export const users = [];

export async function createUser(userData) {
 try { 
    // Passwort hashen bevor es gespeichert wird
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const info = stmt.run(userData.email, hashedPassword);
    
    // Wir geben das gehashte Passwort nicht zurück
    return { 
      id: info.lastInsertRowid, 
      email: userData.email 
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function verifyUserCredentials(email, password) {

    // Benutzer anhand der E-Mail-Adresse finden
    const user = findUserByEmail(email);
    
    // Wenn kein Benutzer gefunden wurde, geben wir false zurück
    if (!user) {
      return false;
    }
    
    // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Hash übereinstimmt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    return isPasswordValid ? user : false;
}


export function findUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
} 