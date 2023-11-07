import { RegisteredStreamPickupEntity } from './customer_streams.entity';

export class CustomerEntity {
  id!: string;
  name!: string;
  address!: string;
  registered_stream_pickups!: RegisteredStreamPickupEntity[];
}
