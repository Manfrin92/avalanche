import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/user/infra/typeorm/entities/User';
import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('user_skills')
class UserSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'type_skill_id' })
  typeSkill: string;

  @Column({ name: 'other_description', nullable: true })
  otherDescription?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default UserSkills;
