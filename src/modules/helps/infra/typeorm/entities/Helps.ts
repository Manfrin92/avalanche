import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('helps')
class Helps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'type_id' })
  helperId: User;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'type_id' })
  helpedId: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Helps;
