import express from 'express';
const router = express.Router();

import { createUser, getAllUsers } from '../controllers/user.controller.js';
import { getAllMessagesByFromAndTo, sendMessage } from '../controllers/message.controller.js';
import { auth } from '../controllers/auth.controller.js';
import verifyToken from '../utils/verify.token.js';

// User
router.post('/register', createUser);
router.get('/users', verifyToken, getAllUsers);

// Message
router.post('/sendMessage', verifyToken, sendMessage);
router.get('/getAllMessageByTo', verifyToken, getAllMessagesByFromAndTo);

// Auth
router.post('/auth', auth);

export default router;