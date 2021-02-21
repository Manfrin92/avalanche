import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from '@modules/user/infra/typeorm/entities/User';
import Type from '@modules/type/infra/typeorm/entities/Type';

@Entity('user_skills')
class UserSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: string;

  @ManyToOne(() => Type, { nullable: false })
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
