import { ServiceProviderAvailabilityService } from './service_provider_availability.service';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';

//3. Testability
describe('ServiceProviderAvailabilityService', () => {
  let serviceProviderRepository: ServiceProviderRepository;
  let serviceProviderAvailabilityService: ServiceProviderAvailabilityService;

  beforeEach(() => {
    serviceProviderRepository = new ServiceProviderRepository();
    serviceProviderAvailabilityService = new ServiceProviderAvailabilityService(
      serviceProviderRepository,
    );
  });

  describe('findAvailabilityAt', () => {
    it(`should return empty list if no service providers are available for postal code #X`, () => {});

    it(`should return empty list fi no service providers are available at date $y`, () => {});

    it(`should return a list of service providers that are available for postal code #X at date $y`, () => {});
  });
});
