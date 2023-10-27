import { CustomerEntity } from '../entities/customer.entity';

export class CustomerRepository {
  private readonly customers: CustomerEntity[] = [];

  /*
    4. Opportunity
    Can you use a better strategy to assing values?
  */
  public save(customer: CustomerEntity): void {
    const existingCustomer = this.findById(customer.id);

    if (existingCustomer) {
      Object.assign(existingCustomer, customer);
    } else {
      this.customers.push(customer);
    }
  }

  public findById(id: string): CustomerEntity | undefined {
    return this.customers.find(customer => customer.id === id);
  }
}
