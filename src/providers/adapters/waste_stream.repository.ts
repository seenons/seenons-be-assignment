import { WasteStreamEntity } from "../entities/waste_stream.entity";

export class WasteStreamRepository {
    constructor(private wasteStreamRepository: WasteStreamEntity[] = []){}

    public findById(id: string):  WasteStreamEntity | undefined {
        return this.wasteStreamRepository.find(ws => ws.id == id);
    }
}