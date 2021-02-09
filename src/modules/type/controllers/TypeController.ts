import { Request, Response } from 'express';
import TypeService from '../services/TypeService';
// import AppError from '@shared/errors/AppError';

export default class TypeController {
  public async findAllByGroupName(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const typeService = new TypeService();
      const { groupName } = request.params;

      if (!groupName) {
        return response
          .status(400)
          .send('Faltam dados para a pesquisa.')
          .json(false);
      }

      const types = await typeService.findAllByGroupName(groupName);
      return response.json(types);
    } catch (e) {
      console.log('Erro no cadastro da ajuda, ', e);
      return response.status(400).send('Erro no cadastro da ajuda.');
    }
  }
}
