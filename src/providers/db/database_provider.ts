import { DataSource } from "typeorm";

export class DatabaseProvider {
    private static dataSource: DataSource;

    public static async initialize() {
        if (!this.dataSource){
            this.dataSource = new DataSource(require('../../ormconfig.json'));
            await this.dataSource.initialize();
        }
    }

    public static async close() {
        if (this.dataSource){
            await this.dataSource.destroy();
        }
    }

    public static getDataSource(): DataSource {
        if (!this.dataSource){
            throw new Error('DataSource not initialized.');
        }
        return this.dataSource;
    }
}