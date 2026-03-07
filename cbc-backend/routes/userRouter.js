import express from 'express';
import { createUser, loginUser, getCurrentUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getCurrentUser);

export default userRouter;