import express from 'express';
import { createUser, loginUser, getCurrentUser, getAllUsers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getCurrentUser);
userRouter.get('/all', getAllUsers);

export default userRouter;