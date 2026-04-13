import express, {} from "express";
import Database from "./config/database.js";
class App {
    app;
    constructor() {
        this.app = express();
        this.databaseSync();
        this.routes();
    }
    databaseSync() {
        const db = new Database();
        db.sequelize?.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Hello world");
        });
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server started succesfully on port ${port}`);
});
//# sourceMappingURL=index.js.map