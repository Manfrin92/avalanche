/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import ICreateHelpDTO from '@modules/help/dtos/ICreateHelpDTO';

import Address from '@modules/address/infra/typeorm/entities/Address';
import HelpDate from '@modules/helpDate/infra/typeorm/entities/HelpDate';
import Needy from '@modules/needy/infra/typeorm/entities/Needy';
import Help from '../infra/typeorm/entities/Help';

class HelpService {
  private ormRepository: Repository<Help>;

  constructor() {
    this.ormRepository = getRepository(Help);
  }

  public async create(helpData: ICreateHelpDTO): Promise<Help | undefined> {
    const addressRepository = getRepository(Address);
    const needyRepository = getRepository(Needy);
    const HelpDateRepository = getRepository(HelpDate);

    try {
      const address = await addressRepository.create(helpData);
      await addressRepository.save(address);
      const needy = await needyRepository.create(helpData);
      await needyRepository.save(needy);
      const help = this.ormRepository.create({
        ...helpData,
        address: address.id,
        needy: needy.id,
      });

      await this.ormRepository.save(help);

      const helpDate = await HelpDateRepository.create({
        date: helpData.helpDate,
        help: help.id,
      });

      await HelpDateRepository.save(helpDate);

      return help;
    } catch (e) {
      throw new Error(`Erro ao criar ajuda: ${e}`);
    }
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

  public async findAllById(id: string): Promise<Help[] | undefined> {
    const helpRepository = getRepository(Help);
    const help = await helpRepository.find({
      where: { id },
    });
    return help;
  }

  public async delete(id: string): Promise<void> {
    const helpRepository = getRepository(Help);
    const help = await helpRepository.findOne({
      where: {
        id,
      },
    });

    if (!help) {
      throw new Error('Help ID does not exist');
    }

    await helpRepository.delete({ id });
  }

  public async update(helpData: any): Promise<Help | undefined> {
    const helpRepository = getRepository(Help);
    const help = await helpRepository.findOne({
      where: {
        id: helpData.id,
      },
    });

    await helpRepository.save(helpData);
    return help;
  }

  public async getHelpRelatedInfo(helpId: string): Promise<any> {
    const helpRepository = getRepository(Help);
    const addressRepository = getRepository(Address);
    const helpDateRepository = getRepository(HelpDate);
    const needyRepository = getRepository(Needy);

    const help = await helpRepository.findOne({
      where: { id: helpId },
    });

    // const address = await addressRepository.findOne({
    //   where: { id: help?.address },
    // });

    const helpDate = await helpDateRepository.findOne({
      where: {
        help: helpId,
      },
    });

    // const needy = await needyRepository.findOne({
    //   where: {
    //     id: help?.needy,
    //   },
    // });

    console.log(help);
    console.log('========');
    // console.log(address);
    console.log('========');
    console.log(helpDate);
    console.log('========');
    // console.log(needy);
    console.log('========');

    return help;
  }
}

export default HelpService;
