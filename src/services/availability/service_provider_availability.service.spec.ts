import { ServiceProviderAvailabilityService } from './service_provider_availability.service';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';
import { ServiceProviderCoverageEntity, Weekday } from '../../providers/entities/service_provider_coverage.entity';
import { WasteStreamCategory, WasteStreamEntity } from '../../providers/entities/waste_stream.entity';
import { DataSource } from 'typeorm';

function createServiceProviderCoverage(overrides = {}):ServiceProviderCoverageEntity {
  const coverage = new ServiceProviderCoverageEntity();
  coverage.id = '1';
  coverage.postal_code_start = '1010';
  coverage.postal_code_end = '1020';
  coverage.waste_stream = createWasteStream();
  coverage.weekday_availability = [Weekday.Monday, Weekday.Tuesday, Weekday.Thursday];
  Object.assign(coverage, overrides);
  return coverage;
}

function createWasteStream(overrides = {}):WasteStreamEntity {
  return {
    id: '1',
    label: 'paper',
    category: WasteStreamCategory.recyclable,
    ...overrides
  }
}
//3. Testability
describe('ServiceProviderAvailabilityService', () => {
  let serviceProviderRepository: ServiceProviderRepository;
  let serviceProviderAvailabilityService: ServiceProviderAvailabilityService;
  let serviceProviderCoverage1: ServiceProviderCoverageEntity;
  let serviceProviderCoverage2: ServiceProviderCoverageEntity;
  let serviceProviderCoverage3: ServiceProviderCoverageEntity;
  let serviceProviderUnwasted: ServiceProviderEntity;
  let serviceProviderBluecollection: ServiceProviderEntity;

  beforeEach(() => {
    const mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    const mockDatasource = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as unknown as DataSource;
    serviceProviderRepository = new ServiceProviderRepository(mockDatasource);
    serviceProviderCoverage1 = createServiceProviderCoverage();
    serviceProviderCoverage2 = createServiceProviderCoverage({id: '2', 
      waste_stream: createWasteStream({id:'2', label: 'metal'}), 
      weekday_availability: [Weekday.Monday, Weekday.Wednesday, Weekday.Friday]});
    serviceProviderCoverage3 = createServiceProviderCoverage({id: '3', 
      postal_code_start: '1000', postal_code_end: '9999',
      waste_stream: createWasteStream({id:'2', label: 'metal'}), 
      weekday_availability: [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday]});
    serviceProviderUnwasted = new ServiceProviderEntity();
    serviceProviderUnwasted.id = '1';
    serviceProviderUnwasted.name = 'Unwasted';
    serviceProviderUnwasted.address = 'Stationplein, 1, 1012 AB Amsterdam';
    serviceProviderUnwasted.coverages = [serviceProviderCoverage1, serviceProviderCoverage2];
    serviceProviderBluecollection = new ServiceProviderEntity();
    serviceProviderBluecollection.id = '2';
    serviceProviderBluecollection.name = 'Bluecollection';
    serviceProviderBluecollection.address = 'Prins Hendrikkade, 1, 1012 JD Amsterdam';
    serviceProviderBluecollection.coverages = [serviceProviderCoverage3];
    serviceProviderRepository.save(serviceProviderUnwasted);
    serviceProviderRepository.save(serviceProviderBluecollection);
    jest.spyOn(serviceProviderRepository, 'getServiceProviders').mockResolvedValue([
      serviceProviderUnwasted,
      serviceProviderBluecollection
    ]);
    serviceProviderAvailabilityService = new ServiceProviderAvailabilityService(
      serviceProviderRepository,
    );
  });

  describe('findAvailabilityAt', () => {
    it(`should return [Unwasted (paper, metal), Bluecollection(metal)] for postal code 1010 on a Monday (2023-10-02)`, async () => {
      const response = await serviceProviderAvailabilityService.findAvailabilityAt('1010', new Date('2023-10-02'));
      expect(response).toHaveLength(2);
      expect(response).toContain(serviceProviderBluecollection);
      expect(response).toContain(serviceProviderUnwasted);
    });

    it(`should return [Unwasted(metal) , Bluecollection(metal)] for postal code 1010 on a Wednesday (2023-10-04)`, async () => {
      const response = await serviceProviderAvailabilityService.findAvailabilityAt('1010', new Date('2023-10-04'));
      expect(response).toHaveLength(2);
      expect(response).toContain(serviceProviderBluecollection);
      expect(response).toContain(serviceProviderUnwasted);
    });

    it(`should return [Bluecollection(metal)] for postal code 2000 on a Thursday (2023-10-05)`, async () => {
      const response = await serviceProviderAvailabilityService.findAvailabilityAt('2000', new Date('2023-10-05'));
      expect(response).toHaveLength(1);
      expect(response).toContain(serviceProviderBluecollection);
    });

    it(`should return empty list if no service providers are available for postal code 1010 on a Sunday (2023-10-08)`, async () => {
      const response = await serviceProviderAvailabilityService.findAvailabilityAt('1010', new Date('2023-10-08'));
      expect(response).toHaveLength(0);
    });

    it(`should return empty list if no service providers are available at postal code 0000`, async () => {
      const response = await serviceProviderAvailabilityService.findAvailabilityAt('0000', new Date('2023-10-08'));
      expect(response).toHaveLength(0);
    });
  });
});
