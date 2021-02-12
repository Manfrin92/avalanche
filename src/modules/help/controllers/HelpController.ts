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

      const help = await helpService.create(data);
      return response.json(help?.id);
    } catch (e) {
      throw new Error(`Erro no cadastro da ajuda: ${e}`);
    }
  }

  public async findAllByUserManagerId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { userManagerId } = request.body;

      const help = await helpService.findAllByUserManagerId(userManagerId);
      return response.json(help);
    } catch (e) {
      throw new Error(`Erro ao buscar ajuda: ${e}`);
    }
  }

  public async findAllById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.body;

      const help = await helpService.findAllById(id);

      return response.json(help);
    } catch (e) {
      throw new Error(`Erro ao buscar ajuda: ${e}`);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.body;

      await helpService.delete(id);
      return response.status(204).send();
    } catch (e) {
      throw new Error(`Erro ao deletar ajuda: ${e}`);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const data = request.body;
      const help = await helpService.update(data);
      return response.json(help);
    } catch (e) {
      throw new Error(`Erro ao deletar ajuda: ${e}`);
    }
  }
}
