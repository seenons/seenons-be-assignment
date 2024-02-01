import { ServiceProviderCoverageEntity } from './service_provider_coverage.entity';

export class ServiceProviderEntity {
  id!: string;
  name!: string;
  address!: string;
  coverages!: ServiceProviderCoverageEntity[];

  public isDateAvailableForPostalCode(pickupDate: Date, postalCode: string): boolean {
    const dayOfWeek = pickupDate.getDay() === 0 ? 7 : pickupDate.getDay() + 1;
  // Wasn't sure if coverage areas could potentially overlap? So made the assumption that they could
    const validCoverages = this.coverages.filter(coverage =>
      postalCode >= coverage.postal_code_start &&
      postalCode <= coverage.postal_code_end &&
      coverage.weekday_availability.includes(dayOfWeek));

    return validCoverages.length > 0;

  }
}
