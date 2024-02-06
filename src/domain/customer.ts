import { RegisteredWastePickup } from './registered_waste_pickup';

export class Customer {
  id!: string;
  name!: string;
  address!: string;
  postal_code!: string;
  registered_waste_pickups!: RegisteredWastePickup[];
}
