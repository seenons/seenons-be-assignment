import { RegisterStreamService } from './register_stream.service';
import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { CustomerEntity } from '../../providers/entities/customer.entity';
import { WasteStreamCategory, WasteStreamEntity } from '../../providers/entities/waste_stream.entity';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { WasteStreamRepository } from '../../providers/adapters/waste_stream.repository';
import { RegisteredStreamPickupRepository } from '../../providers/adapters/registered_stream_pickup.repository';
import { DataSource } from 'typeorm';
import { InMemoryCache } from '../../providers/cache/in_memory_cache';

function createMockServiceProvider(overrides = {}): ServiceProviderEntity {
  const mockServiceProvider = new ServiceProviderEntity();
  mockServiceProvider.id = 'service-provider-id';
  mockServiceProvider.name = 'service-provider-name';
  mockServiceProvider.address = 'service-provider-address';
  mockServiceProvider.coverages = [];
  mockServiceProvider.isDateAvailableForPostalCode = jest.fn((pickupDate, postalCode) => true);
  Object.assign(mockServiceProvider, overrides);
  return mockServiceProvider;
}

function createMockCustomer(overrides = {}): CustomerEntity {
  return {
    id: 'customer-id',
    name: 'customer-name',
    address: 'customer-address',
    postal_code: '1000',
    ...overrides
  };
}

function createMockWasteStream(overrides = {}): WasteStreamEntity {
  return {
    id: 'stream-id',
    label: 'label',
    category: WasteStreamCategory.compostable,
    ...overrides
  }
}

describe('RegisterStreamService', () => {
  let customerRepository: CustomerRepository;
  let registerStreamService: RegisterStreamService;
  let serviceProviderRepository: ServiceProviderRepository;
  let wasteStreamRepository: WasteStreamRepository;
  let registeredStreamPickupRepository: RegisteredStreamPickupRepository;

  beforeEach(() => {
    const mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    const mockDatasource = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as unknown as DataSource;
    customerRepository = new CustomerRepository(mockDatasource);
    serviceProviderRepository = new ServiceProviderRepository(mockDatasource);
    wasteStreamRepository = new WasteStreamRepository(mockDatasource);
    registeredStreamPickupRepository = new RegisteredStreamPickupRepository(mockDatasource, new InMemoryCache());
    registerStreamService = new RegisterStreamService(customerRepository, serviceProviderRepository, wasteStreamRepository, registeredStreamPickupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStreamErrors', () => {
    it(`should throw an error if the customer doesn't exist`, async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(null);
      const response = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Customer not found', success: false});
      expect(customerRepository.findById).toHaveBeenCalledWith('customer-id');
    });

    it(`should throw an error if the stream doesn't exist`, async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(createMockCustomer());
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValue(createMockServiceProvider());
      jest.spyOn(wasteStreamRepository, 'findById').mockResolvedValue(null);
      
      const response = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Waste Stream not found', success: false});
      expect(wasteStreamRepository.findById).toHaveBeenCalledWith('stream-id');
    });

    it(`should throw an error if the service provider doesn't exist`, async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(createMockCustomer());
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValue(null);
      jest.spyOn(wasteStreamRepository, 'findById').mockResolvedValue(createMockWasteStream());

      const response = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Service Provider not found', success: false});
      expect(serviceProviderRepository.findById).toHaveBeenCalledWith('service-provider-id');
    });

    it(`should throw an error if the customer is not in the postal code zone of service provider`, async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(createMockCustomer());
      const mockServiceProvider = createMockServiceProvider();
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValue(mockServiceProvider);
      jest.spyOn(mockServiceProvider, 'isDateAvailableForPostalCode').mockImplementation(() => false);
      jest.spyOn(wasteStreamRepository, 'findById').mockResolvedValue(createMockWasteStream());

      const response = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Date unavailable for postal code', success: false})
    });
  });

  describe('registerStream', () => {
    //1. Implementation
    it(`should register the stream`, async () => {
      const customer = createMockCustomer();
      const wasteStream = createMockWasteStream();
      const serviceProvider = createMockServiceProvider();
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(customer);
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValue(serviceProvider);
      jest.spyOn(wasteStreamRepository, 'findById').mockResolvedValue(wasteStream);

      const response = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date('2023-01-02'),);

      expect(response).toEqual({
        success: true, 
        data: {
          registered_stream_pickup: {
            id: expect.any(String),
            waste_stream: wasteStream,
            service_provider: serviceProvider,
            pickup_date: new Date('2023-01-02'),
            customer: customer,
          },
        },
      });
    });

    //4. Opportunities
    it(`should update the previous stream if it already exists`, async () => {
      // I need clarification here, because I'm not sure how you could be certain you want to update a previous stream vs create a new one
      // Seems like if the date or waste stream is different, then those could just be additional new pickups to schedule and not necessarily an update
      // However if only the service provider is different, that seems unlikely it would be a new pickup and most likely a change, so I'll go forward with assuming that is possible...
      const customer = createMockCustomer();
      const wasteStream = createMockWasteStream();
      const serviceProvider = createMockServiceProvider();
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(customer);
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValueOnce(serviceProvider);
      jest.spyOn(wasteStreamRepository, 'findById').mockResolvedValue(wasteStream);
      jest.spyOn(customerRepository, 'save').mockResolvedValue(customer);
      
      const response1 = await registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date('2023-01-02'));
      const originalPickup = response1.data!.registered_stream_pickup;
      const differentServiceProvider = createMockServiceProvider({id: 'different-service-provider-id'});
      jest.spyOn(serviceProviderRepository, 'findById').mockResolvedValueOnce(differentServiceProvider);
      jest.spyOn(registeredStreamPickupRepository, 'getPickupsForCustomer').mockResolvedValueOnce([originalPickup]);
      jest.spyOn(registeredStreamPickupRepository, 'save').mockResolvedValueOnce(originalPickup);
      const response2 = await registerStreamService.registerStream('customer-id', 'stream-id', 'different-service-provider-id', new Date('2023-01-02'));
      
      expect(response2.data?.registered_stream_pickup.service_provider.id).toEqual('different-service-provider-id');
      expect(response2.data?.registered_stream_pickup).toEqual(response1.data?.registered_stream_pickup);
    });
  });

});
