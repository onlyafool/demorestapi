import express from 'express';
import { authenticate } from '../util/auth.js';
import * as events  from '../controllers/events-controller.js';

const router = express.Router();

// Event erstellen
router.post('/', authenticate, events.create);

// Event bearbeiten
router.put('/:id', authenticate, events.edit);

// Event löschen
router.delete('/:id', authenticate, events.deleteItem);

// Alle Events abrufen
router.get('/', events.getAll);

// Einzelnes Event abrufen
router.get('/:id', events.getOne);

export default router;
