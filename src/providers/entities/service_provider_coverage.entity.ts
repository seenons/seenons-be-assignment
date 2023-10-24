import { CoverageAvailabilityEntity } from './coverage_availability.entity';

export class ServiceProviderCoverageEntity {
  id!: string;
  stream_id!: string;
  postal_code_start!: string;
  postal_code_end!: string;
  coverage_availability!: CoverageAvailabilityEntity[];
}
