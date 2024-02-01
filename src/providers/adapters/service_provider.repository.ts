import { ServiceProviderEntity } from '../entities/service_provider.entity';

//1. Implementation
export class ServiceProviderRepository {
  constructor(private serviceProviders: ServiceProviderEntity[] = []) {
  }

  public findById(id: string): ServiceProviderEntity | undefined {
    return this.serviceProviders.find(sp => sp.id===id);
  }

  public getServiceProviders(): ServiceProviderEntity[] {
    return this.serviceProviders;
  }
  
  public addOrUpdateServiceProvider(serviceProvider: ServiceProviderEntity): void {
    const index = this.serviceProviders.findIndex(sp => serviceProvider.id === sp.id)
    if (index !== -1) {
      this.serviceProviders[index] = serviceProvider;
    }
    else {
      this.serviceProviders.push(serviceProvider);
    }
  }
  
}
