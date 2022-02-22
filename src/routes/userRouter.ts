import express from 'express';

import { addUser, editUser, getUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.use('/add', addUser);
userRouter.use('/edit/:id', editUser);
userRouter.use('/:id', getUser);

export default userRouter;
