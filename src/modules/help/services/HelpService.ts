/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import ICreateHelpDTO from '@modules/help/dtos/ICreateHelpDTO';

import Help from '../infra/typeorm/entities/Help';

class HelpService {
  private ormRepository: Repository<Help>;

  constructor() {
    this.ormRepository = getRepository(Help);
  }

  public async create(helpData: ICreateHelpDTO): Promise<Help | undefined> {
    const help = this.ormRepository.create(helpData);
    await this.ormRepository.save(help);
    // eslint-disable-next-line consistent-return
    return help;
  }

  public async save(help: Help): Promise<Help> {
    return this.ormRepository.save(help);
  }

  public async findAllByUserManagerId(
    userManagerId: string,
  ): Promise<Help[] | undefined> {
    const helpRepository = getRepository(Help);
    const help = await helpRepository.find({
      where: { userManager: userManagerId },
    });
    return help;
  }
}

export default HelpService;
