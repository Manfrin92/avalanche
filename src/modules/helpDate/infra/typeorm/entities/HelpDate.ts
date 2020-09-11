import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  OneToOne,
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
  date: Date;

  @OneToOne(() => Help)
  @JoinColumn({ name: 'help_id' })
  helpeId: Help;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_volunteer_id' })
  userVolunteerId: User;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  typeId: Type;

  @ManyToMany(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurantId: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default HelpDate;
