import { Request, Response } from 'express';
import AddressService from '../services/AddressService';
// import AppError from '@shared/errors/AppError';

export default class AddressController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const data = request.body;

      if (
        !data.addressZipCode ||
        !data.addressStreet ||
        !data.addressArea ||
        !data.addressCity ||
        !data.addressState
      ) {
        return response
          .status(400)
          .send('Faltam dados para o cadastro de endereço.')
          .json(false);
      }

      const addressService = new AddressService();
      const address = await addressService.create(data);
      return response.json(address?.id);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro de endereço.');
    }
  }

  public async getAddressById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const data = request.body;

      if (!data.id) {
        return response
          .status(400)
          .send('Faltam dados para buscar o endereço.')
          .json(false);
      }

      const addressService = new AddressService();
      const address = await addressService.getAddressById(data.id);
      return response.json(address);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro de endereço.');
    }
  }

  public async deleteById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const data = request.body;

      console.log('dados chegando: ', data);

      if (!data.id) {
        return response
          .status(400)
          .send('Faltam dados para buscar o endereço.')
          .json(false);
      }

      const addressService = new AddressService();
      const address = await addressService.deleteById(data.id);
      return response.json(address);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro de endereço.');
    }
  }
}
