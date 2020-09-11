import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import Needy from '@modules/needy/infra/typeorm/entities/Needy';

@Entity('help')
class Help {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_manager_id' })
  userManagerId: User;

  @ManyToOne(() => Needy)
  @JoinColumn({ name: 'needy_id' })
  needyId: Needy;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Help;
