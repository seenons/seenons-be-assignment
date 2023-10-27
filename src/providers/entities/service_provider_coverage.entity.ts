import { CoverageAvailabilityEntity } from './coverage_availability.entity';
import { StreamEntity } from './stream.entity';

export class ServiceProviderCoverageEntity {
  id!: string;
  stream!: StreamEntity;
  postal_code_start!: string;
  postal_code_end!: string;
  coverage_availability!: CoverageAvailabilityEntity[];
}
