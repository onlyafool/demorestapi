# DEMO-REST-API

Dieses Projekt ist eine einfache REST-API für Benutzer- und Eventverwaltung. Die API ist mit Node.js und Express umgesetzt und verwendet SQLite als Datenbank. Sie unterstützt Authentifizierung per JWT und bietet Endpunkte für die Registrierung, das Login sowie das Erstellen, Bearbeiten, Löschen und Abrufen von Events.

## Features
- Benutzerregistrierung und Login mit Passwort-Hashing (bcrypt)
- Authentifizierung mit JSON Web Tokens (JWT)
- CRUD-Operationen für Events (Erstellen, Bearbeiten, Löschen, Anzeigen)
- Speicherung aller Daten in einer SQLite-Datenbank
- Moderne Projektstruktur mit Controllern, Models und Routen

## Verwendete Technologien
- **Node.js**: JavaScript-Laufzeitumgebung
- **Express**: Webframework für Node.js
- **better-sqlite3**: Schnelle SQLite-Bibliothek für Node.js
- **bcrypt**: Passwort-Hashing
- **jsonwebtoken**: Token-basierte Authentifizierung
- **Git**: Versionskontrolle

## Projektstruktur
```
├── app.js
├── controllers/
│   ├── users-controller.js
│   └── events-controller.js
├── models/
│   ├── user.js
│   └── event.js
├── routes/
│   ├── users.js
│   └── events.js
├── util/
│   └── auth.js
├── database.js
├── database.sqlite
├── package.json
└── README.md
```

## Schnellstart
1. Repository klonen
2. Abhängigkeiten installieren: `npm install`
3. Server starten: `npm start`

Die API läuft standardmäßig auf `http://localhost:3000`.

---

**Hinweis:**
Dieses Projekt dient als Demo und kann beliebig erweitert werden. 