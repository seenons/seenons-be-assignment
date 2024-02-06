import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
  
  @Column()
  address!: string;

  @Column()
  postal_code!: string;
}
