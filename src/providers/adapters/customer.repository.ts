import { DataSource, Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerRepository {
  private repo: Repository<CustomerEntity>;

  constructor(datasource: DataSource){
    this.repo = datasource.getRepository(CustomerEntity);
  }

  /*
    4. Opportunity
    Can you use a better strategy to assign values?
  */
  public async save(customer: CustomerEntity): Promise<CustomerEntity> {
    return await this.repo.save(customer);
  }

  public async findById(id: string): Promise<CustomerEntity | null> {
    return await this.repo.findOneBy({id});
  }
}
