import { createUser, findUserByEmail, verifyUserCredentials } from '../models/user.js';
import { generateToken } from '../util/auth.js';

// Registrierung
export async function signup(req, res) {
  const { email, password } = req.body;
  
  // Überprüfen, ob E-Mail und Passwort nicht leer sind
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: 'E-Mail und Passwort erforderlich.' });
  }
  
  // E-Mail-Validierung mit regulärem Ausdruck
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Ungültige E-Mail-Adresse.' });
  }
  
  // Passwortlänge überprüfen
  if (password.length < 6) {
    return res.status(400).json({ message: 'Passwort muss mindestens 6 Zeichen lang sein.' });
  }
  
  // Überprüfen, ob die E-Mail bereits existiert
  if (findUserByEmail(email)) {
    return res.status(409).json({ message: 'Benutzer existiert bereits.' });
  }
  
  const newUser = await createUser({ email, password });
  const token = generateToken(newUser);
  
  res.status(201).json({ 
    message: 'Benutzer erfolgreich registriert.',
    id: newUser.id,
    email: newUser.email,
    token: token
  });
}

// Login
export async function login(req, res) {
  const { email, password } = req.body;
  
  // Überprüfen, ob E-Mail und Passwort nicht leer sind
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(401).json({ message: 'Ungültige Anmeldedaten.' });
  }
  
  try {
    // Benutzeranmeldedaten mit der verifyUserCredentials-Funktion überprüfen
    const user = await verifyUserCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten.' });
    }
    
    const token = generateToken(user);
    
    
    res.json({ 
      message: 'Login erfolgreich.',
      id: user.id,
      email: user.email,
      token: token
    });
  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ message: 'Serverfehler beim Login.' });
  }
}