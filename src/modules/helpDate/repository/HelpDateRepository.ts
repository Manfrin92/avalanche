/* eslint-disable @typescript-eslint/naming-convention */
import Type from '@modules/type/infra/typeorm/entities/Type';
import { Between, EntityRepository, getRepository, Repository } from 'typeorm';
import HelpDate from '../infra/typeorm/entities/HelpDate';

interface HelpDateFilter {
  initialDate: Date;
  finalDate: Date;
  type: Type;
}

@EntityRepository(HelpDate)
class HelpDateRepository extends Repository<HelpDate> {
  public async filterByDateAndType(
    filter: HelpDateFilter,
  ): Promise<HelpDate[]> {
    const findHelpDate = await this.find({
      where: {
        date: Between(filter.initialDate, filter.finalDate),
        type: filter.type,
        userVolunteer: null,
      },
    });

    return findHelpDate;
  }
}

export default HelpDateRepository;
