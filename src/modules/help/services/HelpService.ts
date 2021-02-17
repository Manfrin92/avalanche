/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import ICreateHelpDTO from '@modules/help/dtos/ICreateHelpDTO';
import { getHours, getMinutes } from 'date-fns';

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
    const helpDateRepository = getRepository(HelpDate);

    const help = await helpRepository.findOne({
      where: { id: helpId },
    });

    const helpDate = await helpDateRepository.findOne({
      where: {
        help: helpId,
      },
    });

    let hour: any = getHours(helpDate?.date) || undefined;
    let minutes: any = getMinutes(helpDate?.date) || undefined;

    if (helpDate && helpDate.date) {
      if (String(hour).length === 1 && String(hour).substr(0, 1) !== '0') {
        hour = `0${String(hour).substr(0, 1)}`;
      } else if (
        String(hour).length === 1 &&
        String(hour).substr(0, 1) === '0'
      ) {
        hour = `0${String(hour).substr(0, 1)}`;
      }

      if (String(minutes).substr(0, 1) === '0') {
        minutes = '00';
      } else if (String(minutes).length === 1) {
        minutes = `${String(minutes).substr(0, 1)}0`;
      }
    }

    return {
      helpId: help?.id,
      addressId: help?.address.id || null,
      needyId: help?.needy.id || null,
      name: help?.needy.name || null,
      email: help?.needy.email || null,
      dddPhoneNumber: help?.needy.phoneNumber
        ? help?.needy.phoneNumber.substr(0, 2)
        : null,
      phoneNumber: help?.needy.phoneNumber
        ? help?.needy.phoneNumber.substr(2)
        : null,
      showContact: help?.needy.showContact,
      title: help?.title,
      description: help?.description || null,
      observation: help?.observation || null,
      date: helpDate && helpDate.date ? helpDate.date : null,
      dateHour:
        helpDate && helpDate.date ? `${hour || '00'}:${minutes || '00'}` : null,
      addressZipCode: help?.address.addressZipCode || null,
      addressStreet: help?.address.addressStreet || null,
      addressNumber: help?.address.addressNumber || null,
      addressComplement: help?.address.addressComplement || null,
      addressArea: help?.address.addressArea || null,
      addressCity: help?.address.addressCity || null,
      addressState: help?.address.addressState || null,
    };
  }
}

export default HelpService;
