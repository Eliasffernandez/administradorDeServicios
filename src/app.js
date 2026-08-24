/*import { config } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";


const serviceManager = new ServiceManager();
console.log(`Puerto: ${config.port}`);
console.log(`Entorno: ${config.nodeEnv}`);

console.log(serviceManager.getServices());
*/
import { config } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";
const serviceManager = new ServiceManager();

console.log("TODOS LOS SERVICIOS");
console.log(serviceManager.getServices());

console.log("BUSCAR SERVICIO");
console.log(serviceManager.getServiceById(1));

console.log("AGREGAR SERVICIO");

const nuevoServicio = serviceManager.addService({
    name: "Lavado de auto",
    description: "Lavado completo",
    duration: 60,
    price: 8000,
    category: "Automotor",
    available: true
});

console.log(nuevoServicio);

console.log("ACTUALIZAR SERVICIO");

const servicioActualizado = serviceManager.updateService(nuevoServicio.id, {
    price: 9000
});

console.log(servicioActualizado);

console.log("ELIMINAR SERVICIO");

const servicioEliminado = serviceManager.deleteService(nuevoServicio.id);

console.log(servicioEliminado);

console.log("SERVICIOS FINALES");
console.log(serviceManager.getServices());