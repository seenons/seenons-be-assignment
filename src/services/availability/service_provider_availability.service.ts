import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';

export class ServiceProviderAvailabilityService {
  constructor(private serviceProviderRepository: ServiceProviderRepository) {}

  public findAvailabilityAt(postalCode: string, date: Date): ServiceProviderEntity[] | null {
    // How do you find the available service providers?
    // Can you perhaps cache this? If so, how?

    return null;
  }
}
