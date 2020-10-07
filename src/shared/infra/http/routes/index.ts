import { Router, json } from 'express';
import userRouter from '@modules/user/http/routes/user.routes';
import addressRouter from '@modules/address/http/routes/address.routes';
import helpRouter from '@modules/help/http/routes/help.routes';

const routes = Router();
routes.use(json());

routes.use('/user', userRouter);
routes.use('/address', addressRouter);
routes.use('/help', helpRouter);

export default routes;
