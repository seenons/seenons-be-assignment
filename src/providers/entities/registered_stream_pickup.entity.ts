import { WasteStreamEntity } from './waste_stream.entity';
import { ServiceProviderEntity } from './service_provider.entity';
import { CustomerEntity } from './customer.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class RegisteredStreamPickupEntity {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => WasteStreamEntity)
  @JoinColumn({ name: 'waste_stream_id' })
  waste_stream!: WasteStreamEntity;

  @ManyToOne(() => ServiceProviderEntity)
  @JoinColumn({ name: 'service_provider_id' })
  service_provider!: ServiceProviderEntity;

  @Column()
  pickup_date!: Date;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;
}
