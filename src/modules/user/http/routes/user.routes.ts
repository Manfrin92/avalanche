import { Router } from 'express';
import UserController from '../../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/add', userController.create);
userRouter.put('/', userController.update);
userRouter.post('/checkCpfEmail', userController.checkCpfEmail);
userRouter.post('/logIn', userController.logIn);

export default userRouter;
