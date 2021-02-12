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

      const types = await typeService.findAllByGroupName(groupName);
      return response.json(types);
    } catch (e) {
      throw new Error(`Erro ao buscar tipo: ${e}`);
    }
  }
}
