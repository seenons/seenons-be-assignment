import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { CustomerEntity } from '../../providers/entities/customer.entity';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { WasteStreamRepository } from '../../providers/adapters/waste_stream.repository';
import * as crypto from 'crypto';

/*
  2. Refactoring
*/
export type RegisterStreamResponse =
  | CustomerEntity
  | {
      error: string;
    };

export class RegisterStreamService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly serviceProviderRepository: ServiceProviderRepository,
    private readonly wasteStreamRepository: WasteStreamRepository) {}

  public registerStream(
    customerId: string,
    streamId: string,
    serviceProviderId: string,
    pickupDate: Date,
  ): RegisterStreamResponse {
    const customer = this.customerRepository.findById(customerId);
    const wasteStream = this.wasteStreamRepository.findById(streamId);
    const serviceProvider = this.serviceProviderRepository.findById(serviceProviderId);

    if (!customer) {
      return {error: 'Customer not found',};
    }
    if (!wasteStream){
      return {error: 'Waste Stream not found'}
    }
    if (!serviceProvider) {
      return {error: 'Service Provider not found'}
    }
    if (!serviceProvider.isDateAvailableForPostalCode(pickupDate, customer.postal_code)){
      return {error: 'Date unavailable for postal code'}
    }

    /*
      1. Implementation & 2. Refactoring
      - How do you make sure the stream exists? - done
      - How do you make sure the service provider exists? - done
      - How do you make sure that the pickup date is available for the service provider? done
      - How do you make sure that the customer in question is within the service provider's area? done

      4. Opportunities
      - How about a Rich Domain Model instead of an Anemic Domain Model?
      - How about a Domain Event to notify the service provider?
      - How about a Domain Event to notify the customer?
      - Can you spot improvements to avoid duplicates? (immutability vs mutability perhaps?)
    */

    const existingPickup = customer.registered_stream_pickups.find(pickup => 
      pickup.pickup_date.getTime() === pickupDate.getTime() &&
      pickup.waste_stream.id === streamId);
    if (existingPickup){
      existingPickup.service_provider = serviceProvider;
    }
    else {
      customer.registered_stream_pickups.push({
        id: crypto.randomUUID(),
        waste_stream: wasteStream,
        service_provider: serviceProvider,
        pickup_date: pickupDate,
      });
    }

    this.customerRepository.save(customer);

    return customer;
  }
}
