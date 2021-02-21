/* eslint-disable @typescript-eslint/naming-convention */
import Type from '@modules/type/infra/typeorm/entities/Type';
import { EntityRepository, Repository } from 'typeorm';
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
    const findHelpDate = await this.createQueryBuilder()
      .select([
        'helpDate.id',
        'helpDate.date',
        'help.id',
        'help.id',
        'help.id',
        'help.id',
        'help.id',
      ])
      .from(HelpDate, 'help_date')
      .orderBy('helpDate.date', 'DESC')
      .getMany();

    console.log('FILTRO PASSADO: ', filter);

    // .where('order.central = :central_id', {
    //   central_id: filter.central,
    // });

    // if (filter.typeStatus && filter.typeStatus.length > 0) {
    //   findOrder.andWhere('order.typeStatus in (:...typeStatus)', {
    //     typeStatus: filter.typeStatus,
    //   });
    // }

    const resp = findHelpDate;

    console.log('RESPOSTA: ', resp);

    return resp;
  }
}

export default HelpDateRepository;
