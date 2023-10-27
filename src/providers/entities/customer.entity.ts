import { CustomerStreamsEntity } from './customer_streams.entity';

export class CustomerEntity {
  id!: string;
  name!: string;
  address!: string;
  streams!: CustomerStreamsEntity[];
}
