import { Request, Response } from 'express';
// import AppError from '@shared/errors/AppError';
import HelpDateService from '../services/HelpDateService';

export default class HelpDateController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const data = request.body;

      const helpDate = await helpDateService.create(data);
      return response.json(helpDate);
    } catch (e) {
      throw new Error(`Erro ao criar dia da ajuda: ${e}`);
    }
  }

  public async helpDatesByUserVolunteerId(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { userVolunteer } = request.body;

      return response.status(400).send('Envie o id do usuário voluntário');
    } catch (e) {
      throw new Error(`Erro ao buscar dia da ajuda: ${e}`);
    }
  }

  public async helpDatesById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { id } = request.body;

      const helpDates = await helpDateService.helpDatesById(id);

      if (helpDates && helpDates.length < 1) {
        return response
          .status(200)
          .json({ message: 'helpDate não encontrado' });
      }

      return response.json(helpDates);
    } catch (e) {
      throw new Error(`Erro ao buscar dia da ajuda: ${e}`);
    }
  }

  public async helpDatesByHelpId(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { helpId } = request.body;

      const helpDates = await helpDateService.helpDatesByHelpId(helpId);

      if (helpDates && helpDates.length === 0) {
        return response
          .status(200)
          .json({ message: 'helpDates não encontrados' });
      }

      return response.json(helpDates);
    } catch (e) {
      throw new Error(`Erro ao buscar dia da ajuda: ${e}`);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const helpDateService = new HelpDateService();
      const data = request.body;
      const helpDate = await helpDateService.update(data);
      return response.json(helpDate);
    } catch (e) {
      throw new Error(`Erro ao atualizar dia da ajuda: ${e}`);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const helpDateService = new HelpDateService();
      const { id } = request.body;

      await helpDateService.delete(id);
      return response.status(204).send();
    } catch (e) {
      throw new Error(`Erro ao deletar dia da ajuda: ${e}`);
    }
  }
}
