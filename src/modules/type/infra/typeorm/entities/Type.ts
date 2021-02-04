import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('type')
class Type {
  @Column({
    type: 'varchar',
    length: 40,
    primary: true,
  })
  id: string;

  @Column()
  name: string;

  @Column({ name: 'group_name' })
  groupName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Type;
