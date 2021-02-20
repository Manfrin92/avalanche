import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('needy')
class Needy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'show_contact', default: true })
  showContact: boolean;

  @Column({ nullable: true })
  ddd: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}

export default Needy;
