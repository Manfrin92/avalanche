import { getRepository, Repository } from 'typeorm';

import Needy from '@modules/needy/infra/typeorm/entities/Needy';

class NeedyService {
  private ormRepository: Repository<Needy>;

  constructor() {
    this.ormRepository = getRepository(Needy);
  }

  public async getNeedyById(id: string): Promise<Needy | undefined> {
    const needy = await this.ormRepository.findOne(id);
    return needy;
  }

  public async getAllNeedies(): Promise<Needy[] | undefined> {
    const needies = await this.ormRepository.find();
    return needies;
  }

  public async getNeedyByEmail(email: string): Promise<Needy | undefined> {
    const needy = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return needy;
  }

  public async getNeedyByName(name: string): Promise<Needy | undefined> {
    const needy = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return needy;
  }
}

export default NeedyService;
