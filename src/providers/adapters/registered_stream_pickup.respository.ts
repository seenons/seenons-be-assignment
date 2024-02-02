import { RegisteredStreamPickupEntity } from "../entities/registered_stream_pickup.entity";

export class RegisteredStreamPickupRepository {
    constructor(private registeredStreamPickups: RegisteredStreamPickupEntity[] = []){}

    public getPickupsForCustomer(customerId: string): RegisteredStreamPickupEntity[] {
        return this.registeredStreamPickups.filter(rsp => rsp.customer.id === customerId);
    }

    public save(registeredStreamPickup: RegisteredStreamPickupEntity): void {
        this.registeredStreamPickups.push(registeredStreamPickup);
    }

    public update(registeredStreamPickup: RegisteredStreamPickupEntity): void {
        const index = this.registeredStreamPickups.findIndex(rsp => rsp.id === registeredStreamPickup.id)
        if (index !== -1){
            this.registeredStreamPickups[index] = registeredStreamPickup;
        }
        else {
            this.registeredStreamPickups.push(registeredStreamPickup);
        }
    }
}