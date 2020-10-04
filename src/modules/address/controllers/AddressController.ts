import { Request, Response } from 'express';
import AddressService from '../services/AddressService';
// import AppError from '@shared/errors/AppError';

export default class AddressController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const addressService = new AddressService();
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

      const address = await addressService.create(data);
      return response.json(address?.id);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro de endereço.');
    }
  }
}
