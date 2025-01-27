// /backend/routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser, claimPoints } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers); // Get all users
router.post('/', createUser); // Add a new user
router.post("/claim", claimPoints);

export default router;
