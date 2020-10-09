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
        console.log(data);
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

  public async findAllByUserManagerId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { userManagerId } = request.body;
      if (!userManagerId) {
        response
          .status(400)
          .json({ message: 'Digite o id do usuário gerente' });
      }
      const help = await helpService.findAllByUserManagerId(userManagerId);
      return response.json(help);
    } catch (e) {
      console.log('err', e);
      return response.send('Nenhuma ajuda encontrada');
    }
  }

  public async findAllById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.body;
      if (!id) {
        response.status(400).json({ message: 'Digite o id da ajuda' });
      }
      const help = await helpService.findAllById(id);
      if (help && help.length < 1) {
        response.status(200).json({ message: 'Ajuda não encontrada' });
      }
      return response.json(help);
    } catch (e) {
      console.log('err', e);
      return response.send('Nenhuma ajuda encontrada');
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const { id } = request.body;

      await helpService.delete(id);
      return response.status(204).send();
    } catch (e) {
      throw new Error(e);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const helpService = new HelpService();
      const data = request.body;
      const help = await helpService.update(data);
      return response.json(help);
    } catch (e) {
      throw new Error(e);
    }
  }
}
