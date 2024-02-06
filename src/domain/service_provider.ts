import { ServiceProviderCoverage } from './service_provider_coverage';

export class ServiceProvider {
  id!: string;
  name!: string;
  coverages!: ServiceProviderCoverage[];
}
