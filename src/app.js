
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("handlebars", engine({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/views", viewsRouter);

export default app;