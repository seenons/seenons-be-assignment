import { DataSource, Repository } from "typeorm";
import { WasteStreamEntity } from "../entities/waste_stream.entity";

export class WasteStreamRepository {
    private repo: Repository<WasteStreamEntity>;

    constructor(datasource: DataSource){
        this.repo = datasource.getRepository(WasteStreamEntity);
    }

    public async findById(id: string):  Promise<WasteStreamEntity | null> {
        return await this.repo.findOneBy({id});
    }
}