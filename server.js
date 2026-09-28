import app from "./src/app.js";
import { config } from "./src/config/env.config.js";
import { connectDB } from "./src/config/database.config.js";

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Servidor escuchando en el puerto ${config.port}`);
    });
};

startServer();