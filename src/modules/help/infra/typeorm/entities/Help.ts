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
  userManager: User;

  @ManyToOne(() => Needy)
  @JoinColumn({ name: 'needy_id' })
  needy: Needy;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Help;
