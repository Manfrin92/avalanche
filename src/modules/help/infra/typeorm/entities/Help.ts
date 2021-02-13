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
import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('help')
class Help {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  observation: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_manager_id' })
  userManager: User;

  @OneToMany(() => HelpDate, helpDates => helpDates.help)
  helpDates: HelpDate[];

  @ManyToOne(() => Needy, { eager: true })
  @JoinColumn({ name: 'needy_id' })
  needy: string;

  @ManyToOne(() => Address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @Column({ nullable: true, name: 'image_name' })
  imageName: string;

  @ManyToOne(() => Type, { nullable: true })
  @JoinColumn({ name: 'type_status_id' })
  typeStatusId: string;
}

export default Help;
