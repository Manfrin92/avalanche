import { Request, Response } from 'express';
// import AppError from '@shared/errors/AppError';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import HelpDateService from '../services/HelpDateService';
import HelpDate from '../infra/typeorm/entities/HelpDate';

export default class HelpDateController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const data = request.body;

      if (!data.date || !data.help || !data.userVolunteer || !data.type) {
        console.log(data);
        return response
          .status(400)
          .send('Faltam dados para o cadastro do dia de ajuda');
      }

      const helpDate = await helpDateService.create(data);
      return response.json(helpDate);
    } catch (e) {
      console.log('Erro no cadastro do helpDate, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }

  public async helpDatesByUserVolunteerId(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { userVolunteer } = request.body;

      if (userVolunteer) {
        const helpDates = await helpDateService.helpDatesByUserVolunteerId(
          userVolunteer,
        );
        return response.json(helpDates);
      }

      return response.status(400).send('Envie o id do usuário voluntário');
    } catch (e) {
      console.log('Erro no cadastro do helpDate, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }

  public async helpDatesById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { id } = request.body;

      if (!id) {
        return response.status(400).send('Envie o id do usuário voluntário');
      }

      const helpDates = await helpDateService.helpDatesById(id);

      if (helpDates && helpDates.length < 1) {
        return response
          .status(200)
          .json({ message: 'helpDate não encontrado' });
      }

      return response.json(helpDates);
    } catch (e) {
      console.log('Erro no cadastro do helpDate, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }

  public async helpDatesByHelpId(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const helpDateService = new HelpDateService();
      const { helpId } = request.body;

      if (!helpId) {
        return response.status(400).send('Envie o id da ajuda');
      }

      const helpDates = await helpDateService.helpDatesByHelpId(helpId);

      if (helpDates && helpDates.length === 0) {
        return response
          .status(200)
          .json({ message: 'helpDates não encontrados' });
      }

      return response.json(helpDates);
    } catch (e) {
      console.log('Erro no cadastro do helpDate, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const helpDateService = new HelpDateService();
      const data = request.body;
      const helpDate = await helpDateService.update(data);
      return response.json(helpDate);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const helpDateService = new HelpDateService();
      const { id } = request.body;

      await helpDateService.delete(id);
      return response.status(204).send();
    } catch (e) {
      throw new Error(e);
    }
  }
}
