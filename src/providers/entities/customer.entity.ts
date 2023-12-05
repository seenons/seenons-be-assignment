import { RegisteredStreamPickupEntity } from './registered_stream_pickup.entity';

export class CustomerEntity {
  id!: string;
  name!: string;
  address!: string;
  postal_code!: string;
  registered_stream_pickups!: RegisteredStreamPickupEntity[];
}
