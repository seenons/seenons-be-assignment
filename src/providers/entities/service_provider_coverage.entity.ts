import { CoverageEntity } from './coverage.entity';

export class ServiceProviderCoverageEntity {
  id!: string;
  serviceProvider_id!: string;
  stream_id!: string;
  coverages!: CoverageEntity[];
}
