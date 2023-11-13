import express from 'express';
const router = express.Router();

import { createUser, getAllUsers } from '../controllers/user.controller.js';
import { sendMessage } from '../controllers/message.controller.js';

// User
router.post('/register', createUser);
router.get('/users', getAllUsers);

// Message
router.post('/sendMessage', sendMessage);

export default router;