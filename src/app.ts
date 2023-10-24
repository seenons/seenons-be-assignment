import { CustomerRepository } from './providers/adapters/customer.repository';
import { ServiceProviderRepository } from './providers/adapters/service_provider.repository';
import { ServiceProviderAvailabilityService } from './services/availability/service_provider_availability.service';
import { RegisterStreamService } from './services/customer/register_stream.service';

class App {
  private readonly registerStreamService: RegisterStreamService;
  private readonly serviceProviderAvailabilityService: ServiceProviderAvailabilityService;

  private readonly customerRepository: CustomerRepository;
  private readonly serviceProviderRepository: ServiceProviderRepository;

  constructor() {
    /*
      We pretend that the DI/IoC container is doing this for us.
    */
    this.customerRepository = new CustomerRepository();
    this.serviceProviderRepository = new ServiceProviderRepository();

    this.registerStreamService = new RegisterStreamService(this.customerRepository);
    this.serviceProviderAvailabilityService = new ServiceProviderAvailabilityService(
      this.serviceProviderRepository,
    );
  }
}

export default new App();
