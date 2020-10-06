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
import Restaurant from '@modules/restaurant/infra/typeorm/entities/Restaurant';
import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('help_date')
class HelpDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  observation: string;

  @Column()
  date: Date;

  @OneToOne(() => Help)
  @JoinColumn({ name: 'help_id' })
  help: Help;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_volunteer_id' })
  userVolunteer: User;

  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default HelpDate;
