import { getCustomRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';

class UserService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
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
      console.log('E-mail já está em uso.');
      return false;
    }

    if (cpfFound) {
      // throw new AppError('CPF já está em uso.');
      console.log('CPF já está em uso.');
      return false;
    }

    return true;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }
}

export default UserService;
