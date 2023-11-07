import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { CustomerEntity } from '../../providers/entities/customer.entity';
import * as crypto from 'crypto';
import { WasteStreamEntity } from '../../providers/entities/waste_stream.entity';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';

/*
  2. Refactoring
*/
export type RegisterStreamResponse =
  | CustomerEntity
  | {
  error: string;
};

export class RegisterStreamService {
  constructor(private readonly customerRepository: CustomerRepository) {
  }

  public registerStream(
    customerId: string,
    streamId: string,
    serviceProviderId: string,
    pickupDate: Date,
  ): RegisterStreamResponse {
    const customer = this.customerRepository.findById(customerId);

    if (!customer) {
      return {
        error: 'Customer not found',
      };
    }

    /*
      1. Implementation & 2. Refactoring
      - How do you make sure the stream exists?
      - How do you make sure the service provider exists?
      - How do you make sure that the pickup date is available for the service provider?

      4. Opportunities
      - How about a Rich Domain Model instead of an Anemic Domain Model?
      - How about a Domain Event to notify the service provider?
      - How about a Domain Event to notify the customer?
      - Can you spot improvements to avoid duplicates? (immutability vs mutability perhaps?)
    */

    customer.registered_stream_pickups.push({
      id: crypto.randomUUID(),
      waste_stream: new WasteStreamEntity(),
      service_provider: new ServiceProviderEntity(),
      pickup_date: pickupDate,
    });

    this.customerRepository.save(customer);

    return customer;
  }
}
