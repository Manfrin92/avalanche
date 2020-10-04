import { Router } from 'express';
import UserController from '../../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/add', userController.create);
userRouter.post('/checkCpfEmail', userController.checkCpfEmail);

export default userRouter;
