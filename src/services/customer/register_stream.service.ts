import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { CustomerEntity } from '../../providers/entities/customer.entity';
import * as crypto from 'crypto';

/*
  2. Refactoring
  - Should you return the customer or the stream? Why? (Think about the Bounded Context in which you are affecting)
  - Can you type the Response in a better way?
*/
export type RegisterStreamResponse =
  | CustomerEntity
  | {
      error: string;
    };

export class RegisterStreamService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public registerStream(
    customerId: string,
    streamId: string,
    serviceProviderId: string,
    pickupDate: Date,
    quantity: number,
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
      - Can you spot improvements avoid duplicates? (immutability vs mutability perhaps?)
    */

    customer.streams.push({
      id: crypto.randomUUID(),
      stream_id: streamId,
      service_provider_id: serviceProviderId,
      pickup_date: pickupDate,
      quantity: quantity,
    });

    this.customerRepository.save(customer);

    return customer;
  }
}
