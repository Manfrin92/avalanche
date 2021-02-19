import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import NeedyService from '../services/NeedyService';

export default class NeedyController {
  public async getNeedyById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { needyId } = request.params;
      const needyService = new NeedyService();

      const needy = await needyService.getNeedyById(needyId);
      return response.json(needy);
    } catch (e) {
      throw new AppError(`Erro ao buscar needy: ${e}`);
    }
  }

  public async getAllNeedies(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const needyService = new NeedyService();

      const needies = await needyService.getAllNeedies();
      return response.json(needies);
    } catch (e) {
      throw new AppError(`Erro ao buscar needies: ${e}`);
    }
  }

  public async getNeedyByEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { needyEmail } = request.params;
      const needyService = new NeedyService();

      const needy = await needyService.getNeedyByEmail(needyEmail);
      return response.json(needy);
    } catch (e) {
      throw new AppError(`Erro ao buscar needy por email: ${e}`);
    }
  }

  public async getNeedyByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { needyName } = request.params;
      const needyService = new NeedyService();

      const needy = await needyService.getNeedyByName(needyName);
      return response.json(needy);
    } catch (e) {
      throw new AppError(`Erro ao buscar needy por name: ${e}`);
    }
  }

  public async getNeedyByEmailOrName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const data = request.body;
      const needyService = new NeedyService();
      let needy;

      if (data.needyName) {
        needy = await needyService.getNeedyByName(data.needyName);
      } else if (data.needyEmail) {
        needy = await needyService.getNeedyByEmail(data.needyEmail);
      }

      if (!needy) {
        return response.json('Necessitado não encontrado.');
      }

      return response.json(needy);
    } catch (e) {
      throw new AppError(`Erro ao buscar needy por name: ${e}`);
    }
  }
}
