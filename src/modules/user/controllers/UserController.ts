import { Request, Response } from 'express';
// import AppError from '@shared/errors/AppError';
import UserService from '../services/UserService';

export default class UserController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const userService = new UserService();
      const data = request.body;

      if (
        !data.email ||
        !data.cpf ||
        !data.name ||
        !data.password ||
        !data.phoneNumber
      ) {
        return response.status(400).send('Faltam dados para o cadastro');
      }

      const foundEmailCpf = await userService.getByEmailCpf(
        data.email,
        data.cpf,
      );

      if (foundEmailCpf) {
        return response.status(400).send('CPF ou E-mail já utilizado.');
      }

      const user = await userService.create(data);
      delete user?.password;
      return response.json(user);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }
}
