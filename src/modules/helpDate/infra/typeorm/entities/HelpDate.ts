import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import Help from '@modules/help/infra/typeorm/entities/Help';
import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('help_date')
class HelpDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => Help, { eager: true })
  @JoinColumn({ name: 'help_id' })
  help: Help;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_volunteer_id' })
  userVolunteer: User;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}

export default HelpDate;
