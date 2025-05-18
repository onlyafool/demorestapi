import express from 'express';
import { authenticate } from '../util/auth.js';
import * as events  from '../controllers/events-controller.js';
import { upload } from '../util/upload.js';

const router = express.Router();

// Event erstellen
router.post('/', authenticate, upload.single('image'), events.create);

// Event bearbeiten
router.put('/:id', authenticate, upload.single('image'), events.edit);

// Event löschen
router.delete('/:id', authenticate, events.deleteItem);

// Alle Events abrufen
router.get('/', events.getAll);

// Einzelnes Event abrufen
router.get('/:id', events.getOne);

router.post('/:id/register', authenticate, events.register);

router.delete('/:id/unregister', authenticate, events.unregister);

export default router;
