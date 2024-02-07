import { Customer } from '@domain/customer';
import { ServiceProvider } from '@domain/service_provider';
import { WasteStream } from '@domain/waste_stream';

export type RegisterWastePickupPayload = {
  customerId: string;
  streamId: string;
  serviceProviderId: string;
  pickupDate: Date;
};

export type RegisterWastePickupResponse = { success: boolean; } | { error: string; };

export class RegisterWastePickup {
  constructor() {
  }

  public register(payload: RegisterWastePickupPayload): RegisterWastePickupResponse {
    const customer: Customer | null = null;

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

    return {
      success: true,
    };
  }
}
