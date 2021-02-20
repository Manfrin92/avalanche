/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { hash } from 'bcryptjs';
import Address from '@modules/address/infra/typeorm/entities/Address';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponseUser {
  user: User;
  token: string;
}

class UserService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User | undefined> {
    const addressRepository = getRepository(Address);
    const hashedPassword = await hash(userData.password.toLowerCase(), 8);
    userData.password = hashedPassword;

    try {
      const address = addressRepository.create({
        addressArea: userData.addressArea,
        addressCity: userData.addressCity,
        addressComplement: userData.addressComplement,
        addressNumber: String(userData.addressNumber),
        addressState: userData.addressState,
        addressStreet: userData.addressStreet,
        addressZipCode: userData.addressZipCode,
      });

      await addressRepository.save(address);

      const user = this.ormRepository.create({
        ...userData,
        address,
      });
      await this.ormRepository.save(user);

      return user;
    } catch (e) {
      throw new AppError('Erro ao criar user');
    }
  }

  public async update(userData: User): Promise<User | undefined> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.save(userData);
    const modifiedUser: any = user;
    delete modifiedUser.password;
    return modifiedUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async getByEmailCpf(email: string, cpf: string): Promise<boolean> {
    const emailFound = await this.ormRepository.findOne({
      where: { email },
    });

    const cpfFound = await this.ormRepository.findOne({
      where: { cpf },
    });

    if (emailFound || cpfFound) {
      return true;
    }

    return false;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }
}

export default UserService;
