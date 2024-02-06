import { Customer } from '../../domain/customer';
import { WasteStream } from '../../domain/waste_stream';
import { ServiceProvider } from '../../domain/service_provider';

export type RegisterWastePickupPayload = {
  customerId: string;
  streamId: string;
  serviceProviderId: string;
  pickupDate: Date;
};

export type RegisterWastePickupResponse =
  | Customer
  | {
      error: string;
    };

export class RegisterWastePickup {
  constructor() {}

  public registerStream(payload: RegisterWastePickupPayload): RegisterWastePickupResponse {
    const customer = {} as Customer;

    if (!customer) {
      return {
        error: 'Customer not found',
      };
    }

    const waste_pickup = {
      id: 'a-random-id',
      waste_stream: new WasteStream(),
      service_provider: new ServiceProvider(),
      pickup_date: payload.pickupDate,
    };

    return customer;
  }
}
