import { ServiceProviderCoverage } from './service_provider_coverage';

export class ServiceProvider {
  id!: string;
  name!: string;
  address!: string;
  coverages!: ServiceProviderCoverage[];
}
