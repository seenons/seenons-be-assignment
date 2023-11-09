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
    it(`should return [Unwasted (paper, metal), Bluecollection(metal)] for postal code 1010 on a Monday (2023-10-02)`, () => {
    });

    it(`should return [Unwasted(metal) , Bluecollection(metal)] for postal code 1010 on a Wednesday (2023-10-04)`, () => {
    });

    it(`should return [Bluecollection(metal)] for postal code 2000 on a Thursday (2023-10-05)`, () => {
    });

    it(`should return empty list if no service providers are available for postal code 1010 on a Sunday (2023-10-08)`, () => {
    });

    it(`should return empty list if no service providers are available at postal code 0000`, () => {
    });
  });
});
