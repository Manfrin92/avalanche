import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 11,
    name: 'address_zip_code',
  })
  addressZipCode: string;

  @Column({ type: 'varchar', length: 70, name: 'address_street' })
  addressStreet: string;

  @Column({ type: 'int4', name: 'address_number', nullable: true })
  addressNumber: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'address_complement',
    nullable: true,
  })
  addressComplement: string;

  @Column({ type: 'varchar', length: 60, name: 'address_area' })
  addressArea: string;

  @Column({ type: 'varchar', length: 60, name: 'address_city' })
  addressCity: string;

  @Column({ type: 'varchar', length: 2, name: 'address_state' })
  addressState: string;

  @Column({
    type: 'varchar',
    length: 60,
    name: 'address_country',
    nullable: true,
  })
  addressCountry: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Address;
