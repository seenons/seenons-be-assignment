import { CustomerEntity } from '../entities/customer.entity';

//4. Opportunity
export class CustomerRepository {
  private readonly customers: CustomerEntity[] = [];

  /*
    Can you use a better strategy?
    Perhaps a database instead of an in-memory array?
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
