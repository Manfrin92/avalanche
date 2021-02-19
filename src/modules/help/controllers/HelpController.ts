import AppError from '@shared/errors/AppError';
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
      throw new AppError(`Erro no cadastro da ajuda: ${e}`);
    }
  }

  public async findAllByUserManagerId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { userManagerId } = request.params;

      const help = await helpService.findAllByUserManagerId(userManagerId);
      return response.json(help);
    } catch (e) {
      throw new AppError(`Erro ao buscar ajuda: ${e}`);
    }
  }

  public async findAllById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.body;

      const helps = await helpService.findAllById(id);

      return response.json(helps);
    } catch (e) {
      throw new AppError(`Erro ao buscar ajuda: ${e}`);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.params;

      await helpService.delete(id);
      return response.status(204).send();
    } catch (e) {
      throw new AppError(`Erro ao deletar ajuda: ${e}`);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const data = request.body;
      const help = await helpService.update(data);
      return response.json(help);
    } catch (e) {
      throw new AppError(`Erro ao fazer update da ajuda: ${e}`);
    }
  }

  public async getHelpRelatedInfo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { helpId } = request.params;

      const help = await helpService.getHelpRelatedInfo(helpId);
      return response.json(help);
    } catch (e) {
      throw new AppError(`Erro ao buscar ajuda: ${e}`);
    }
  }
}
