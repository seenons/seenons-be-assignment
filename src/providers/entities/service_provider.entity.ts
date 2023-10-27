import { ServiceProviderCoverageEntity } from './service_provider_coverage.entity';

export class ServiceProviderEntity {
  id!: string;
  name!: string;
  address!: string;
  coverages!: ServiceProviderCoverageEntity[];
}
