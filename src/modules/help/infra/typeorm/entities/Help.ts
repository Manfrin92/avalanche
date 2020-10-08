import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import Needy from '@modules/needy/infra/typeorm/entities/Needy';
import Address from '@modules/address/infra/typeorm/entities/Address';
import HelpDate from '@modules/helpDate/infra/typeorm/entities/HelpDate';

@Entity('help')
class Help {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  observation: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_manager_id' })
  userManager: User;

  @OneToMany(() => HelpDate, helpDates => helpDates.help)
  helpDates: HelpDate[];

  @ManyToOne(() => Needy)
  @JoinColumn({ name: 'needy_id' })
  needy: Needy;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Help;
