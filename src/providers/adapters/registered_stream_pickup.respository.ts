import { DataSource, Repository } from "typeorm";
import { RegisteredStreamPickupEntity } from "../entities/registered_stream_pickup.entity";
import { ICache } from "../cache/icache";

export class RegisteredStreamPickupRepository {
    private repo: Repository<RegisteredStreamPickupEntity>;
    private cache: ICache;

    constructor(datasource: DataSource, cache: ICache){
        this.repo = datasource.getRepository(RegisteredStreamPickupEntity);
        this.cache = cache;
    }

    public async getPickupsForCustomer(customerId: string): Promise<RegisteredStreamPickupEntity[]> {
        const cacheKey = `pickups_${customerId}`;
        const cachedData: RegisteredStreamPickupEntity[] | null = await this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const data =  await this.repo.find({
            where: {
                customer: { id: customerId }
            },
            relations: {
                customer: true,
                waste_stream: true,
                service_provider: true
            }
        });

        await this.cache.set(cacheKey, cachedData);
        return data;
    }

    public async save(registeredStreamPickup: RegisteredStreamPickupEntity): Promise<RegisteredStreamPickupEntity> {
        
        const savedPickup = await this.repo.save(registeredStreamPickup);
        
        const cacheKey = `pickups_${registeredStreamPickup.customer.id}`;
        const cachedPickups = await this.cache.get<RegisteredStreamPickupEntity[]>(cacheKey);
        
        if (cachedPickups) {
            const updatedCache = cachedPickups.map(pickup => pickup.id === savedPickup.id ? savedPickup : pickup);
    
            // If the saved entity is not in the cached pickups, it's a new pickup, so add it.
            if (!updatedCache.find(pickup => pickup.id === savedPickup.id)) {
                updatedCache.push(savedPickup);
            }

            // Save the updated cache.
            await this.cache.set(cacheKey, updatedCache);
        } 
        else {
            await this.cache.set(cacheKey, [savedPickup]);
        }
    
        return savedPickup;
    }
    
}