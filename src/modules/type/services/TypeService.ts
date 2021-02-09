/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import Type from '../infra/typeorm/entities/Type';

class TypeService {
  private ormRepository: Repository<Type>;

  constructor() {
    this.ormRepository = getRepository(Type);
  }

  public async findAllByGroupName(
    groupName: string,
  ): Promise<Type[] | undefined> {
    const types = await this.ormRepository.find({
      where: { groupName },
    });
    return types;
  }
}

export default TypeService;
