import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();
class Database {
    sequelize;
    POSTGRES_DB = process.env.POSTGRES_DB;
    POSTGRES_HOST = process.env.POSTGRES_HOST;
    POSTGRES_PORT = process.env.POSTGRES_PORT;
    POSTGRES_USER = process.env.POSTGRES_USER;
    POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
    constructor() {
        this.connectToPstgreSQL();
    }
    async connectToPstgreSQL() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
        });
        await this.sequelize.authenticate().then(() => {
            console.log("PostgreSQL connection has been established successfully");
        }).catch((err) => {
            console.log("PostgreSQL connection failed: ", err);
        });
    }
}
export default Database;
//# sourceMappingURL=database.js.map