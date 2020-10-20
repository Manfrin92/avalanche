/* eslint-disable no-param-reassign */
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';

import { response } from 'express';
import Address from '../infra/typeorm/entities/Address';

class AddressService {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData);
    await this.ormRepository.save(address);
    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async getAddressById(id: string): Promise<Address | null> {
    const address = await this.ormRepository.findOne(id);
    if (address) {
      return address;
    }
    console.log('Address not found');
    return null;
  }

  public async deleteById(id: string): Promise<void> {
    const address = await this.ormRepository.findOne(id);
    if (!address) {
      console.log('Address not found');
    }
    await this.ormRepository.delete(id);
  }
}

export default AddressService;
