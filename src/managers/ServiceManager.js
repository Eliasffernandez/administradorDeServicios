import fs from "fs";
import path from "path";

class ServiceManager {
    constructor() {
        this.path = path.resolve("src/data/services.json");
    }

    getServices() {
        const services = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(services);
    }

    getServiceById(id) {
        const services = this.getServices();

        return services.find(service => service.id === Number(id)) || null;
    }

    addService(serviceData) {
        const requiredFields = [
            "name",
            "description",
            "duration",
            "price",
            "category",
            "available"
        ];

        const missingFields = requiredFields.filter(
            field => serviceData[field] === undefined
        );

        if (missingFields.length > 0) {
            throw new Error(`Faltan campos: ${missingFields.join(", ")}`);
        }

        const services = this.getServices();

        const newId = services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

        const newService = {
            id: newId,
            ...serviceData
        };

        services.push(newService);

        fs.writeFileSync(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return newService;
    }

    updateService(id, updateData) {
        const services = this.getServices();

        const i = services.findIndex(
            service => service.id === Number(id)
        );

        if (i === -1) {
            return null;
        }

        services[i] = {
            ...services[i],
            ...updateData,
            id: services[i].id
        };

        fs.writeFileSync(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return services[i];
    }

    deleteService(id) {
        const services = this.getServices();

        const i = services.findIndex(
            service => service.id === Number(id)
        );

        if (i === -1) {
            return null;
        }

        const deletedService = services.splice(i, 1);

        fs.writeFileSync(
            this.path,
            JSON.stringify(services, null, 2)
        );

        return deletedService[0];
    }
}

export default ServiceManager;