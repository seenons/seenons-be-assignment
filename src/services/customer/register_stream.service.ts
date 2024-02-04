import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { WasteStreamRepository } from '../../providers/adapters/waste_stream.repository';
import * as crypto from 'crypto';
import { RegisteredStreamPickupEntity } from '../../providers/entities/registered_stream_pickup.entity';
import { RegisteredStreamPickupRepository } from '../../providers/adapters/registered_stream_pickup.repository';

/*
  2. Refactoring
*/
export type RegisterStreamResponse = {
  success: boolean;
  data?: {
    registered_stream_pickup: RegisteredStreamPickupEntity;
  };
  error?: string;
};
  
export class RegisterStreamService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly serviceProviderRepository: ServiceProviderRepository,
    private readonly wasteStreamRepository: WasteStreamRepository,
    private registeredStreamPickupRepository: RegisteredStreamPickupRepository) {}

  public async registerStream(
    customerId: string,
    streamId: string,
    serviceProviderId: string,
    pickupDate: Date,
  ): Promise<RegisterStreamResponse> {
    const customer = await this.customerRepository.findById(customerId);
    const wasteStream = await this.wasteStreamRepository.findById(streamId);
    const serviceProvider = await this.serviceProviderRepository.findById(serviceProviderId);

    if (!customer) {
      return {success: false, error: 'Customer not found'};
    }
    if (!wasteStream){
      return {success: false, error: 'Waste Stream not found'};
    }
    if (!serviceProvider) {
      return {success: false, error: 'Service Provider not found'};
    }
    if (!serviceProvider.isDateAvailableForPostalCode(pickupDate, customer.postal_code)){
      return {success: false, error: 'Date unavailable for postal code'};
      }
    

    /*
      1. Implementation & 2. Refactoring
      - How do you make sure the stream exists? - done
      - How do you make sure the service provider exists? - done
      - How do you make sure that the pickup date is available for the service provider? done
      - How do you make sure that the customer in question is within the service provider's area? done

      4. Opportunities
      - How about a Rich Domain Model instead of an Anemic Domain Model? - pros and cons to each approach
      - How about a Domain Event to notify the service provider?
      - How about a Domain Event to notify the customer?
      - Can you spot improvements to avoid duplicates? (immutability vs mutability perhaps?) - done
    */

    let pickup = await this.getMatchingDateAndWasteStreamPickup(customerId, pickupDate, streamId);

    if (pickup) {
      // if customer has an existing pickup, either we have a perfect dup or perhaps they are trying to 
      // change service providers.    Check this and save changes if any.  Immutable objects would require
      // we delete the old object and save a new one here
      if (pickup.service_provider != serviceProvider) {
        pickup.service_provider = serviceProvider;
        this.registeredStreamPickupRepository.save(pickup);  
      }
    }
    else {
      pickup = new RegisteredStreamPickupEntity();
      pickup.id = crypto.randomUUID();  // TODO - use automatic primary key generation in db
      pickup.waste_stream = wasteStream;
      pickup.service_provider = serviceProvider;
      pickup.pickup_date = pickupDate;
      pickup.customer = customer;
      this.registeredStreamPickupRepository.save(pickup);
    }

    return {success: true, data: {registered_stream_pickup: pickup}};
  }

private async getMatchingDateAndWasteStreamPickup(customerId: string, date: Date, wasteStreamId: string): Promise<RegisteredStreamPickupEntity | null>{
    const existingPickups = await this.registeredStreamPickupRepository.getPickupsForCustomer(customerId);
    let pickup: RegisteredStreamPickupEntity | null = null;  
    if(existingPickups?.length > 0){
      pickup = existingPickups.find(pu =>
      pu.pickup_date.getTime() === date.getTime() &&        
      pu.waste_stream.id === wasteStreamId) || null;
    }
    return pickup;
  }
}
