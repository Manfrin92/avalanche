import { Request, Response } from 'express';
import HelpService from '../services/HelpService';
// import AppError from '@shared/errors/AppError';

export default class HelpController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpService = new HelpService();
      const data = request.body;

      if (!data.title || !data.description) {
        return response
          .status(400)
          .send('Faltam dados para o cadastro da ajuda.')
          .json(false);
      }

      const help = await helpService.create(data);
      return response.json(help?.id);
    } catch (e) {
      console.log('Erro no cadastro da ajuda, ', e);
      return response.status(400).send('Erro no cadastro da ajuda.');
    }
  }
}
