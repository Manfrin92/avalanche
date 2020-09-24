import { Router, json } from 'express';
import userRouter from '@modules/user/http/routes/user.routes';

const routes = Router();
routes.use(json());

routes.use('/user', userRouter);

export default routes;
