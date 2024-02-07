import { FindAvailability } from './find_availability_at';

describe('FindAvailability', () => {
  let findAvailability: FindAvailability;
  beforeEach(() => {
    findAvailability = new FindAvailability();
  });

  describe('at', () => {
    it(`should return [Unwasted (paper, metal), Bluecollection(food_waste)] for postal code 1020 on a Monday (2023-10-02)`, () => {

    });

    it(`should return [Unwasted(metal)] for postal code 1010 on a Wednesday (2023-10-04)`, () => {

    });

    it(`should return [Bluecollection(food_waste)] for postal code 2000 on a Thursday (2023-10-05)`, () => {

    });

    it(`should return empty list if no service providers are available for postal code 1010 on a Sunday (2023-10-08)`, () => {
      const availableProviders = findAvailability.at('1010', new Date('2023-10-08'));

      expect(availableProviders).toEqual([]);
    });

    it(`should return empty list if no service providers are available at postal code 0000`, () => {
      const availableProviders = findAvailability.at('0000', new Date('2023-10-08'));

      expect(availableProviders).toEqual([]);
    });
  });
});
