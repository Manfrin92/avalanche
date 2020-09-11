import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurant')
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restaurant_name: string;

  @Column()
  contact_name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
