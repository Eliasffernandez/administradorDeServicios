import app from "./src/app.js";
import { config } from "./src/config/env.config.js";
import { connectDB } from "./src/config/database.config.js";

import { createServer } from "http";
import { Server } from "socket.io";

const startServer = async () => {
    await connectDB();

    const httpServer = createServer(app);

    const io = new Server(httpServer);

    app.set("io", io);

    io.on("connection", (socket) => {
        console.log("Cliente conectado a Socket.io");

        socket.on("disconnect", () => {
            console.log("Cliente desconectado de Socket.io");
        });
    });

    httpServer.listen(config.port, () => {
        console.log(`Servidor escuchando en el puerto ${config.port}`);
    });
};

startServer();