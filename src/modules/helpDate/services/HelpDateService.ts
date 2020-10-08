/* eslint-disable no-param-reassign */
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import ICreateHelpDateDTO from '@modules/helpDate/dtos/ICreateHelpDateDTO';
import { response } from 'express';

import HelpDate from '../infra/typeorm/entities/HelpDate';

interface IRequest {
  date: Date;
  help: string;
  userVolunteer: string;
  type: string;
}

interface IResponseHelpDate {
  helpDate: HelpDate;
}

class UserService {
  private ormRepository: Repository<HelpDate>;

  constructor() {
    this.ormRepository = getRepository(HelpDate);
  }

  public async create(
    helpDateData: ICreateHelpDateDTO,
  ): Promise<HelpDate | undefined> {
    const helpDate = this.ormRepository.create(helpDateData);
    await this.ormRepository.save(helpDate);
    // eslint-disable-next-line consistent-return
    return helpDate;
  }

  public async save(helpDate: HelpDate): Promise<HelpDate> {
    return this.ormRepository.save(helpDate);
  }

  public async helpDatesByUserVolunteerId(
    userVolunteerId: string,
  ): Promise<HelpDate[]> {
    const helpDateRepository = getRepository(HelpDate);
    const helpDates = await helpDateRepository.find({
      where: {
        userVolunteer: userVolunteerId,
      },
    });
    return helpDates;
  }

  public async update(helpDateData: any): Promise<HelpDate> {
    const helpDateRepository = getRepository(HelpDate);
    const helpDate = await helpDateRepository.findOne({
      where: {
        id: helpDateData.id,
      },
    });

    console.log('achou no banco? ', helpDate);

    if (!helpDate) {
      throw new Error('helpDate not found.');
    }

    await helpDateRepository.save(helpDate);
    return helpDate;
  }

  public async delete(id: string): Promise<void> {
    const helpDateRepository = getRepository(HelpDate);
    const helpDate = await helpDateRepository.findOne({
      where: {
        id,
      },
    });

    if (!helpDate) {
      throw new Error('HelpDate ID does not exist');
    }

    await helpDateRepository.delete({ id });
  }
}

export default UserService;
