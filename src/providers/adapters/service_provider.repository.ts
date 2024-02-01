import { ServiceProviderEntity } from '../entities/service_provider.entity';

//1. Implementation
export class ServiceProviderRepository {
  constructor(private serviceProviders: ServiceProviderEntity[] = []) {
  }

  public findById(id: string): ServiceProviderEntity | undefined {
    return this.serviceProviders.find(sp => sp.id==id);
  }
  
  
}
