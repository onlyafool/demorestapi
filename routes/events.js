import express from 'express';
import { authenticate } from '../util/auth.js';
import * as events  from '../controllers/events-controller.js';

const router = express.Router();

// Event erstellen
router.post('/', authenticate, events.createNewEvent);

// Event bearbeiten
router.put('/:id', authenticate, events.updateEvent);

// Event löschen
router.delete('/:id', authenticate, events.removeEvent);

// Alle Events abrufen
router.get('/', events.getEvents);

// Einzelnes Event abrufen
router.get('/:id', events.getEvent);

export default router;
