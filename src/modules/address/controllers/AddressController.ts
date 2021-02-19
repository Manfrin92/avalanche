import AppError from '@shared/errors/AppError';
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

      const addressService = new AddressService();
      const address = await addressService.create(data);
      return response.json(address?.id);
    } catch (e) {
      throw new AppError('Erro no cadastro de endereço');
    }
  }

  public async getAddressById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const addressService = new AddressService();
      const address = await addressService.getAddressById(id);
      return response.json(address);
    } catch (e) {
      throw new AppError('Erro ao buscar endereço');
    }
  }

  public async deleteById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const addressService = new AddressService();
      const address = await addressService.deleteById(id);
      return response.json(address);
    } catch (e) {
      throw new AppError('Erro ao deletar endereço');
    }
  }
}
