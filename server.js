import app from "./src/app.js";
import { config } from "./src/config/env.config.js";

app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
});

