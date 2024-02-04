import { ServiceProviderCoverageEntity } from './service_provider_coverage.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ServiceProviderEntity {
  @PrimaryColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  address!: string;
  // Consider: I think this could be ManyToMany - could the same coverage entity be used by different service providers?
  @ManyToOne(() => ServiceProviderEntity, serviceProvider => serviceProvider.coverages)
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
