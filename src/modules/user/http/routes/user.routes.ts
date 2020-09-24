import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.post('/', (request: Request, response: Response): void => {
  const { name, email, cpf, password, phoneNumber } = request.body;

  console.log({ name, email, cpf, password, phoneNumber });

  response.send('OK');
});

export default userRouter;
