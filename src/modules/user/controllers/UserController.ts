import { Request, Response } from 'express';
// import AppError from '@shared/errors/AppError';
import UserService from '../services/UserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const userService = new UserService();
      const data = request.body;
      const deliverer = await userService.create(data);
      return response.json(deliverer);
    } catch (e) {
      // throw new AppError(e);
      console.log('Erro no cadastro, ', e);
    }
  }
}
