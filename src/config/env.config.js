import "dotenv/config";

const requiredEnvVariables = ["PORT", "NODE_ENV", "MONGO_URI"];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`No existe la variable de entorno: ${variable}`);
    }
}

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI
};
