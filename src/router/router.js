import express from 'express';
const router = express.Router();

import { createUser, getAllUsers } from '../controllers/user.controller.js';
import { getAllMessagesByFromAndTo, sendMessage } from '../controllers/message.controller.js';

// User
router.post('/register', createUser);
router.get('/users', getAllUsers);

// Message
router.post('/sendMessage', sendMessage);
router.get('/getAllMessageByTo', getAllMessagesByFromAndTo);

export default router;