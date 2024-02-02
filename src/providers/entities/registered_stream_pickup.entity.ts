import { WasteStreamEntity } from './waste_stream.entity';
import { ServiceProviderEntity } from './service_provider.entity';
import { CustomerEntity } from './customer.entity';

export class RegisteredStreamPickupEntity {
  id!: string;
  waste_stream!: WasteStreamEntity;
  service_provider!: ServiceProviderEntity;
  pickup_date!: Date;
  customer!: CustomerEntity;
}
