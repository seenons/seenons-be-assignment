import { WasteStream } from './waste_stream';
import { ServiceProvider } from './service_provider';
import { Customer } from './customer';

export class RegisteredWastePickup {
  id!: string;
  waste_stream!: WasteStream;
  service_provider!: ServiceProvider;
  customer!: Customer;
  pickup_date!: Date;
}
