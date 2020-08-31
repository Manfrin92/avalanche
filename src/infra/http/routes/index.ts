import { Router, json } from 'express';

const routes = Router();
routes.use(json());

routes.use('/ajuda', appointmentsRouter);
routes.use('/organizador', usersRouter);
routes.use('/restaurante', sessionsRouter);
routes.use('/solicitante', usersRouter);
routes.use('/voluntario', sessionsRouter);

export default routes;
