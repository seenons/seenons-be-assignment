import { ServiceProviderEntity } from '../entities/service_provider.entity';

//1. Implementation
export class ServiceProviderRepository {
  constructor(private serviceProviders: ServiceProviderEntity[] = []) {
  }
  
  public get(): ServiceProviderEntity[] | null {
    return null;
  }
}
