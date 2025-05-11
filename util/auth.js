import jwt from 'jsonwebtoken';

// Geheimnis für die JWT-Signierung - sollte in einer Umgebungsvariable gespeichert werden
const JWT_SECRET = process.env.JWT_SECRET || 'abctesttoken1230987654321';

/**
 * Generiert ein JWT für einen Benutzer
 * @param {Object} user - Das Benutzerobjekt
 * @param {number} user.id - Die Benutzer-ID
 * @param {string} user.email - Die E-Mail-Adresse des Benutzers
 * @returns {string} Das generierte JWT
 */
export function generateToken(user) {
  // Payload mit Benutzer-ID und E-Mail
  const payload = {
    userId: user.id,
    email: user.email
  };

  // Token generieren mit 24h Gültigkeit
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verifiziert ein JWT und gibt den decodierten Payload zurück
 * @param {string} token - Das zu verifizierende JWT
 * @returns {Object|null} Der decodierte Payload oder null bei ungültigem Token
 */
export function verifyToken(token) {
    // Token verifizieren und decodieren
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}

// Middleware zur Authentifizierung
export function authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Authentifizierung erforderlich.' });
      }
      
      const decodedToken = verifyToken(token);
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Ungültiger Token.' });
    }
  }
   