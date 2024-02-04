import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';

/*
  1. Implementation
  - How do you find the available service providers?
  - How to model correctly the response according to the expectation? - changed from Any to proper typing
*/
export class ServiceProviderAvailabilityService {
  constructor(private serviceProviderRepository: ServiceProviderRepository) {}

  public async findAvailabilityAt(postalCode: string, date: Date): Promise<ServiceProviderEntity[]> {
    const availableServiceProviders: ServiceProviderEntity[] = [];

    (await this.serviceProviderRepository.getServiceProviders()).forEach(sp => {
      if(sp.isDateAvailableForPostalCode(date, postalCode)){
        availableServiceProviders.push(sp);
      }
    });
    return availableServiceProviders;
  }
}
