import { RegisterStreamService } from './register_stream.service';
import { CustomerRepository } from '../../providers/adapters/customer.repository';
import { WasteStreamEntity } from '../../providers/entities/waste_stream.entity';
import { ServiceProviderEntity } from '../../providers/entities/service_provider.entity';

//3. Testability
describe('RegisterStreamService', () => {
  let customerRepository: CustomerRepository;
  let registerStreamService: RegisterStreamService;

  beforeEach(() => {
    customerRepository = new CustomerRepository();
    registerStreamService = new RegisterStreamService(customerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStream', () => {
    it(`should throw an error if the customer doesn't exist`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(undefined);

      const response = registerStreamService.registerStream(
        'customer-id',
        'stream-id',
        'service-provider-id',
        new Date(),
      );

      expect(response).toEqual({
        error: 'Customer not found',
      });
      expect(customerRepository.findById).toHaveBeenCalledWith('customer-id');
    });

    it(`should throw an error if the stream doesn't exist`, () => {

    });

    it(`should throw an error if the service provider doesn't exist`, () => {

    });

    it(`should throw an error if the pickup date is not available for the service provider`, () => {
      
    });

    //1. Implementation
    it(`should register the stream`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce({
        id: 'customer-id',
        name: 'customer-name',
        address: 'customer-address',
        registered_stream_pickups: [],
      });

      jest.spyOn(customerRepository, 'save').mockReturnValueOnce(undefined);

      const response = registerStreamService.registerStream(
        'customer-id',
        'stream-id',
        'service-provider-id',
        new Date('2023-01-02'),
      );

      expect(response).toEqual({
        id: 'customer-id',
        name: 'customer-name',
        address: 'customer-address',
        registered_stream_pickups: [
          {
            id: expect.any(String),
            waste_stream: new WasteStreamEntity(),
            service_provider: new ServiceProviderEntity(),
            pickup_date: new Date('2023-01-02'),
          },
        ],
      });
    });

    //4. Opportunities
    it(`should update the previous stream if it already exists`, () => {
    });
  });
});
