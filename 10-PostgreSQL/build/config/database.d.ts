import { Sequelize } from "sequelize";
declare class Database {
    sequelize: Sequelize | undefined;
    private POSTGRES_DB;
    private POSTGRES_HOST;
    private POSTGRES_PORT;
    private POSTGRES_USER;
    private POSTGRES_PASSWORD;
    constructor();
    private connectToPstgreSQL;
}
export default Database;
//# sourceMappingURL=database.d.ts.map