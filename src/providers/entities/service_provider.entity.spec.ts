import { ServiceProviderEntity } from "./service_provider.entity";
import { ServiceProviderCoverageEntity, Weekday } from "./service_provider_coverage.entity";

function createServiceProviderCoverage(overrides = {}): ServiceProviderCoverageEntity {
    const coverage = new ServiceProviderCoverageEntity();
    coverage.postal_code_start = '1000';
    coverage.postal_code_end = '2000';
    coverage.weekday_availability = [Weekday.Monday, Weekday.Tuesday];
    return {...coverage, ...overrides};
}

describe('ServiceProviderEntity', () => {
    let serviceProvider: ServiceProviderEntity;

    beforeEach(() => {
        serviceProvider = new ServiceProviderEntity();
        serviceProvider.id = 'service-provider-id';
        serviceProvider.name = 'service-provider-name';
        serviceProvider.address = 'service-provider-address';
        serviceProvider.coverages = [];
    });

    describe('isDateAvailableForPostalCode', () => {
        it('should return true if the date and postal code are in range', () => {
            serviceProvider.coverages.push(createServiceProviderCoverage());
            const date = new Date('2024-01-01'); //this is a Monday
            const result = serviceProvider.isDateAvailableForPostalCode(date, '1500');
            expect(result).toBe(true);
        });

        it('should return false if the date is out of range', () => {
            const coverage = createServiceProviderCoverage();
            serviceProvider.coverages.push(coverage);
            const date = new Date('2024-01-05'); //this is a Friday
            const result = serviceProvider.isDateAvailableForPostalCode(date, '1500');
            expect(result).toBe(false);
        });

        it('should return false if the postal code is out of range', () => {
            const coverage = createServiceProviderCoverage();
            serviceProvider.coverages.push(coverage);
            const date = new Date('2024-01-01'); //this is a Monday
            const result = serviceProvider.isDateAvailableForPostalCode(date, '9999');
            expect(result).toBe(false);
        });
    });
});