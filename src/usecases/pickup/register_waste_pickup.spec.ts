import { RegisterWastePickup } from './register_waste_pickup';

describe('RegisterWastePickup', () => {
  let registerWastePickup: RegisterWastePickup;

  beforeEach(() => {
    registerWastePickup = new RegisterWastePickup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it(`should return an error if the customer doesn't exist`, () => {
      const response = registerWastePickup.register({
        customerId: 'customer-id',
        streamId: 'stream-id',
        serviceProviderId: 'service-provider-id',
        pickupDate: new Date('2023-01-02'),
      });

      expect(response).toEqual({
        error: 'Customer not found',
      });
    });

    it(`should return an error if the stream doesn't exist`, () => {});

    it(`should return an error if the service provider doesn't exist`, () => {});

    it(`should return an error if the pickup date is not available for the service provider`, () => {});

    it(`should return an error if the pickup date is before tomorrow`, () => {});

    it(`should register the waste stream pickup`, () => {});
  });
});
