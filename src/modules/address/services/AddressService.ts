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

  public async create(
    addressData: ICreateAddressDTO,
  ): Promise<Address | undefined> {
    const address = this.ormRepository.create(addressData);
    await this.ormRepository.save(address);
    // eslint-disable-next-line consistent-return
    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default AddressService;
