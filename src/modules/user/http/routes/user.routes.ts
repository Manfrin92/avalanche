import { Router } from 'express';
import UserController from '../../controllers/UserController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/add', userController.create);
userRouter.put('/', ensureAuthenticated, userController.update);
userRouter.post('/checkCpfEmail', userController.checkCpfEmail);
userRouter.post('/logIn', userController.logIn);

export default userRouter;
