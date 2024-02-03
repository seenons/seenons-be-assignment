import { DataSource, Repository } from 'typeorm';
import { ServiceProviderEntity } from '../entities/service_provider.entity';

//1. Implementation
export class ServiceProviderRepository {
  private repo: Repository<ServiceProviderEntity>;

  constructor(datasource: DataSource) {
    this.repo = datasource.getRepository(ServiceProviderEntity);
  }

  public async findById(id: string): Promise<ServiceProviderEntity | null> {
    return await this.repo.findOneBy({id});
  }

  public async getServiceProviders(): Promise<ServiceProviderEntity[]> {
    
    return await this.repo.find();
  }
  
  public async save(serviceProvider: ServiceProviderEntity): Promise<ServiceProviderEntity> {
    return await this.repo.save(serviceProvider);
  }
  
}
