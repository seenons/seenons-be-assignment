import { RegisterStreamService } from './register_stream.service';
import { CustomerRepository } from '../../providers/adapters/customer.repository';

//3. Testability
describe('RegisterStreamService', () => {
  let customerRepository: CustomerRepository;
  let registerStreamService: RegisterStreamService;

  beforeEach(() => {
    customerRepository = new CustomerRepository();
    registerStreamService = new RegisterStreamService(customerRepository);
  });

  afterEach(() => {
    //4. Opportunities
    jest.clearAllMocks();
  });

  describe('registerStream', () => {
    beforeEach(() => {
      //4. Opportunities
    });

    it(`should throw an error if the customer doesn't exist`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce(undefined);

      const response = registerStreamService.registerStream(
        'customer-id',
        'stream-id',
        'service-provider-id',
        new Date(),
        5,
      );

      expect(response).toEqual({
        error: 'Customer not found',
      });
      expect(customerRepository.findById).toHaveBeenCalledWith('customer-id');
    });

    it(`should throw an error if the stream doesn't exist`, () => {
      throw new Error('Not implemented');
    });

    it(`should throw an error if the service provider doesn't exist`, () => {
      throw new Error('Not implemented');
    });

    it(`should throw an error if the pickup date is not available for the service provider`, () => {
      throw new Error('Not implemented');
    });

    it(`should register the stream`, () => {
      jest.spyOn(customerRepository, 'findById').mockReturnValueOnce({
        id: 'customer-id',
        name: 'customer-name',
        email: 'customer-email',
        address: 'customer-address',
        streams: [],
      });

      jest.spyOn(customerRepository, 'save').mockReturnValueOnce(undefined);

      const response = registerStreamService.registerStream(
        'customer-id',
        'stream-id',
        'service-provider-id',
        new Date('2023-01-01'),
        5,
      );

      expect(response).toEqual({
        id: 'customer-id',
        name: 'customer-name',
        email: 'customer-email',
        address: 'customer-address',
        streams: [
          {
            id: expect.any(String),
            stream_id: 'stream-id',
            service_provider_id: 'service-provider-id',
            pickup_date: new Date('2023-01-01'),
            quantity: 5,
          },
        ],
      });
    });

    //4. Opportunities
    it(`should update the previous stream if it already exists`, () => {});
  });
});
