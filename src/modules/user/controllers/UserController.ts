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
      const user = await userService.create(data);
      return response.json(user);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
    }
    return undefined;
  }
}
