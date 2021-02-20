/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import ICreateHelpDTO from '@modules/help/dtos/ICreateHelpDTO';
import { getHours, getMinutes } from 'date-fns';

import Address from '@modules/address/infra/typeorm/entities/Address';
import HelpDate from '@modules/helpDate/infra/typeorm/entities/HelpDate';
import Needy from '@modules/needy/infra/typeorm/entities/Needy';
import Help from '../infra/typeorm/entities/Help';

interface UpdateHelpData {
  addressArea: string;
  addressCity: string;
  addressComplement?: string;
  addressCountry: string;
  addressId: string;
  addressNumber: string;
  addressState: string;
  addressStreet: string;
  addressZipCode: number;
  dateHour: string;
  dddPhoneNumber: string;
  description: string;
  email: string;
  helpDate: string;
  helpDateId: string;
  helpId: string;
  name: string;
  needyId: string;
  observation: string;
  phoneNumber: string;
  title: string;
  userManager: string;
  showContact: boolean;
  helpedDateType: string;
}

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
      const address = await addressRepository.save({
        addressArea: helpData.addressArea,
        addressCity: helpData.addressCity,
        addressComplement: helpData.addressComplement,
        addressNumber: helpData.addressNumber,
        addressState: helpData.addressState,
        addressStreet: helpData.addressStreet,
        addressZipCode: helpData.addressZipCode,
      });
      const needy = await needyRepository.save(helpData);
      const help = await this.ormRepository.save({
        ...helpData,
        address: address.id,
        needy: needy.id,
      });

      await HelpDateRepository.save({
        help: help.id,
        date: helpData.helpDate,
        type: helpData.helpedDateTypeId,
      });

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

  public async update(helpData: UpdateHelpData): Promise<Help | undefined> {
    const addressRepository = getRepository(Address);
    const needyRepository = getRepository(Needy);
    const HelpDateRepository = getRepository(HelpDate);

    const address = await addressRepository.findOne(helpData.addressId);

    console.log('dados que serão salvosno address: ', {
      id: helpData.addressId,
      addressZipCode: String(helpData.addressZipCode),
      addressArea: helpData.addressArea,
      addressCity: helpData.addressCity,
      addressComplement: helpData.addressComplement,
      addressState: helpData.addressState,
      addressNumber: helpData.addressNumber,
      addressStreet: helpData.addressStreet,
    });

    if (address) {
      await addressRepository.save({
        id: helpData.addressId,
        addressZipCode: String(helpData.addressZipCode),
        addressArea: helpData.addressArea,
        addressCity: helpData.addressCity,
        addressComplement: helpData.addressComplement,
        addressState: helpData.addressState,
        addressNumber: helpData.addressNumber,
        addressStreet: helpData.addressStreet,
      });
    }

    const needy = await needyRepository.findOne(helpData.needyId);

    console.log('Dados que serão salvos no needy: ', {
      id: helpData.needyId,
      email: helpData.email,
      name: helpData.name,
      phoneNumber: helpData.phoneNumber,
      showContact: helpData.showContact,
    });

    if (needy) {
      await needyRepository.save({
        id: helpData.needyId,
        email: helpData.email,
        name: helpData.name,
        phoneNumber: helpData.phoneNumber,
        showContact: helpData.showContact,
      });
    }

    const help = await this.ormRepository.findOne(helpData.helpId);

    if (help) {
      await this.ormRepository.save({
        ...help,
        id: helpData.helpId,
        title: helpData.title,
        description: helpData.description,
        observation: helpData.observation,
      });
    }

    const helpDate = await HelpDateRepository.findOne(helpData.helpDateId);

    if (helpDate) {
      await HelpDateRepository.save({
        id: helpData.helpDateId,
        date: helpData.helpDate,
        type: helpData.helpedDateType,
      });
    }

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
      helpDateId: helpDate?.id || null,
      name: help?.needy.name || null,
      email: help?.needy.email || null,
      ddd: help?.needy.ddd ? help?.needy.ddd : null,
      phoneNumber: help?.needy.phoneNumber ? help?.needy.phoneNumber : null,
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
