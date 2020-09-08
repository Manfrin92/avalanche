import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Types from '@modules/types/infra/typeorm/entities/Types';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  phone_code: string;

  @Column()
  phone_number: string;

  @Column()
  type_id: string;

  @ManyToOne(() => Types)
  @JoinColumn({ name: 'type_id' })
  typeId: Types;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
