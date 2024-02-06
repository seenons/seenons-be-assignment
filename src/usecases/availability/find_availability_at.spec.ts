describe('FindAvailability', () => {
  beforeEach(() => {});

  describe('at', () => {
    it(`should return [Unwasted (paper, metal), Bluecollection(metal)] for postal code 1010 on a Monday (2023-10-02)`, () => {});

    it(`should return [Unwasted(metal) , Bluecollection(metal)] for postal code 1010 on a Wednesday (2023-10-04)`, () => {});

    it(`should return [Bluecollection(metal)] for postal code 2000 on a Thursday (2023-10-05)`, () => {});

    it(`should return empty list if no service providers are available for postal code 1010 on a Sunday (2023-10-08)`, () => {});

    it(`should return empty list if no service providers are available at postal code 0000`, () => {});
  });
});
