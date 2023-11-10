import express from 'express';
const router = express.Router();

import { createUser, getAllUsers } from '../controllers/user.controller.js';

// User
router.post('/register', createUser);
router.get('/users', getAllUsers);

export default router;