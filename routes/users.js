import express from 'express';
import { signup, login } from '../controllers/users-controller.js';

const router = express.Router();

// Registrierung
router.post('/signup', signup);

// Login
router.post('/login', login);

export default router; 