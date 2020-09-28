/* eslint-disable no-param-reassign */
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { hash } from 'bcryptjs';

import { response } from 'express';
import User from '../infra/typeorm/entities/User';

class UserService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User | undefined> {
    const hashedPassword = await hash(userData.password.toLowerCase(), 8);
    userData.password = hashedPassword;

    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    // eslint-disable-next-line consistent-return
    return user;
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

    if (emailFound) {
      // throw new AppError('E-mail já está em uso.');
      return true;
    }

    if (cpfFound) {
      // throw new AppError('CPF já está em uso.');
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
