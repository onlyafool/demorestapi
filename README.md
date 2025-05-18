# DEMO-REST-API

Dieses Projekt ist eine einfache REST-API für Benutzer- und Eventverwaltung. Die API ist mit Node.js und Express umgesetzt und verwendet SQLite als Datenbank. Sie unterstützt Authentifizierung per JWT und bietet Endpunkte für die Registrierung, das Login sowie das Erstellen, Bearbeiten, Löschen und Abrufen von Events.

## Features
- Benutzerregistrierung und Login mit Passwort-Hashing (bcrypt)
- Authentifizierung mit JSON Web Tokens (JWT)
- **Events sind an Benutzer gebunden (user_id)**
- **Nur der Ersteller kann sein Event bearbeiten oder löschen (Berechtigungsprüfung)**
- Vollständige CRUD-Operationen für Events (Erstellen, Bearbeiten, Löschen, Anzeigen)
- Speicherung aller Daten in einer SQLite-Datenbank
- Moderne Projektstruktur mit Controllern, Models und Routen
- **Bild-Upload für Events (mit Validierung von Dateityp und -größe, Speicherung im Verzeichnis `public/images/`)**

## Verwendete Technologien
- **Node.js**: JavaScript-Laufzeitumgebung
- **Express**: Webframework für Node.js
- **better-sqlite3**: Schnelle SQLite-Bibliothek für Node.js
- **bcrypt**: Passwort-Hashing
- **jsonwebtoken**: Token-basierte Authentifizierung
- **multer**: Middleware für Datei-Uploads
- **Git**: Versionskontrolle

## API-Überblick

### Authentifizierung
- Registrierung: `/users/signup`
- Login: `/users/login`
- Alle Event-Routen (POST, PUT, DELETE) erfordern einen gültigen JWT im Header: `Authorization: Bearer <token>`

### Events
- Event erstellen: `POST /events` (authentifiziert, **erfordert Bild-Upload**)
- Event bearbeiten: `PUT /events/:id` (nur Ersteller, authentifiziert, **erfordert Bild-Upload**)
- Event löschen: `DELETE /events/:id` (nur Ersteller, authentifiziert)
- Alle Events abrufen: `GET /events`
- Einzelnes Event abrufen: `GET /events/:id`

#### Bild-Upload Hinweise
- Beim Erstellen und Bearbeiten eines Events muss ein Bild mit dem Feldnamen `image` als `multipart/form-data` hochgeladen werden.
- Unterstützte Formate: alle Bildformate (`image/*`)
- Maximale Dateigröße: 5MB
- Das Bild wird im Verzeichnis `public/images/` gespeichert und der Dateiname in der Datenbank hinterlegt.

### Datenbankstruktur (Events)
| Feld        | Typ     | Beschreibung                |
|-------------|---------|-----------------------------|
| id          | INTEGER | Primärschlüssel             |
| title       | TEXT    | Titel des Events            |
| description | TEXT    | Beschreibung                |
| address     | TEXT    | Adresse                     |
| date        | TEXT    | Datum (ISO-Format)          |
| image       | TEXT    | Dateiname des Event-Bildes  |
| user_id     | INTEGER | ID des Erstellers (Benutzer)|

## Projektstruktur
```