import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';
import UserController from '../../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.put('/', ensureAuthenticated, userController.update);
userRouter.post('/checkCpfEmail', userController.checkCpfEmail);
userRouter.post('/logIn', userController.logIn);

export default userRouter;
