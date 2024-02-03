import { DataSource, Repository } from "typeorm";
import { RegisteredStreamPickupEntity } from "../entities/registered_stream_pickup.entity";

export class RegisteredStreamPickupRepository {
    private repo: Repository<RegisteredStreamPickupEntity>;

    constructor(datasource: DataSource){
        this.repo = datasource.getRepository(RegisteredStreamPickupEntity);
    }

    public async getPickupsForCustomer(customerId: string): Promise<RegisteredStreamPickupEntity[]> {
        return await this.repo.find({
            where: {
                customer: { id: customerId }
            },
            relations: {
                customer: true,
                waste_stream: true,
                service_provider: true
            }
        });
    }

    public async save(registeredStreamPickup: RegisteredStreamPickupEntity): Promise<RegisteredStreamPickupEntity> {
        return await this.repo.save(registeredStreamPickup);
    }
}