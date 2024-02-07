import { WasteStream } from './waste_stream';
import { ServiceProvider } from './service_provider';

export class RegisteredWastePickup {
  id!: string;
  waste_stream!: WasteStream;
  service_provider!: ServiceProvider;
  pickup_date!: Date;
}
