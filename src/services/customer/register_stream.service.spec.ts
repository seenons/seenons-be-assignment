import { RegisterStreamService } from './register_stream.service';
import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { CustomerEntity } from '../../providers/entities/customer.entity';
import { WasteStreamCategory, WasteStreamEntity } from '../../providers/entities/waste_stream.entity';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';
import { ServiceProviderRepository } from '../../providers/adapters/service_provider.repository';
import { WasteStreamRepository } from '../../providers/adapters/waste_stream.repository';
import { RegisterStreamResponse } from './register_stream.service';
import { RegisteredStreamPickupRepository } from '../../providers/adapters/registered_stream_pickup.respository';

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
    customerRepository = new CustomerRepository();
    serviceProviderRepository = new ServiceProviderRepository();
    wasteStreamRepository = new WasteStreamRepository();
    registeredStreamPickupRepository = new RegisteredStreamPickupRepository();
    registerStreamService = new RegisterStreamService(customerRepository, serviceProviderRepository, wasteStreamRepository, registeredStreamPickupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStreamErrors', () => {
    it(`should throw an error if the customer doesn't exist`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(undefined);
      const response = registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Customer not found', success: false});
      expect(customerRepository.findById).toHaveBeenCalledWith('customer-id');
    });

    it(`should throw an error if the stream doesn't exist`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(createMockCustomer());
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(createMockServiceProvider());
      jest.spyOn(wasteStreamRepository, 'findById').mockReturnValueOnce(undefined);
      
      const response = registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Waste Stream not found', success: false});
      expect(wasteStreamRepository.findById).toHaveBeenCalledWith('stream-id');
    });

    it(`should throw an error if the service provider doesn't exist`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(createMockCustomer());
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(undefined);
      jest.spyOn(wasteStreamRepository, 'findById').mockReturnValueOnce(createMockWasteStream());

      const response = registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Service Provider not found', success: false});
      expect(serviceProviderRepository.findById).toHaveBeenCalledWith('service-provider-id');
    });

    it(`should throw an error if the customer is not in the postal code zone of service provider`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(createMockCustomer());
      const mockServiceProvider = createMockServiceProvider();
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(mockServiceProvider);
      jest.spyOn(mockServiceProvider, 'isDateAvailableForPostalCode').mockImplementation(() => false);
      jest.spyOn(wasteStreamRepository, 'findById').mockReturnValueOnce(createMockWasteStream());

      const response = registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date());
      expect(response).toEqual({error: 'Date unavailable for postal code', success: false})
    });
  });

  describe('registerStream', () => {
    //1. Implementation
    it(`should register the stream`, () => {
      const customer = createMockCustomer();
      const wasteStream = createMockWasteStream();
      const serviceProvider = createMockServiceProvider();
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(customer);
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(serviceProvider);
      jest.spyOn(wasteStreamRepository, 'findById').mockReturnValueOnce(wasteStream);

      const response = registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date('2023-01-02'),);

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
    it(`should update the previous stream if it already exists`, () => {
      // I need clarification here, because I'm not sure how you could be certain you want to update a previous stream vs create a new one
      // Seems like if the date or waste stream is different, then those could just be additional new pickups to schedule and not necessarily an update
      // However if only the service provider is different, that seems unlikely it would be a new pickup and most likely a change, so I'll go forward with assuming that is possible...
      const customer = createMockCustomer();
      const wasteStream = createMockWasteStream();
      const serviceProvider = createMockServiceProvider();
      jest.spyOn(customerRepository, 'findById').mockReturnValue(customer);
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(serviceProvider);
      jest.spyOn(wasteStreamRepository, 'findById').mockReturnValue(wasteStream);
      jest.spyOn(customerRepository, 'save').mockReturnValue(undefined);
      registerStreamService.registerStream('customer-id','stream-id','service-provider-id',new Date('2023-01-02'));
      const differentServiceProvider = createMockServiceProvider({id: 'different-service-provider-id'});
      jest.spyOn(serviceProviderRepository, 'findById').mockReturnValueOnce(differentServiceProvider);
      const response = registerStreamService.registerStream('customer-id', 'stream-id', 'different-service-provider-id', new Date('2023-01-02'));
      const streamResponse = response as RegisterStreamResponse;
      expect(streamResponse.data?.registered_stream_pickup.service_provider.id).toEqual('different-service-provider-id');
      expect(registeredStreamPickupRepository.getPickupsForCustomer(customer.id)).toHaveLength(1);
    });
  });
});
