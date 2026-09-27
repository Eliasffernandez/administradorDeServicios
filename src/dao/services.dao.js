import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/services.json");

class ServicesDAO {
    getAll() {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    getById(id) {
        const services = this.getAll();

        return services.find(
            service => service.id === Number(id)
        ) || null;
    }

    create(service) {
        const services = this.getAll();

        const newId = services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

        const newService = {
            id: newId,
            ...service
        };

        services.push(newService);

        fs.writeFileSync(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return newService;
    }

    update(id, updateData) {
        const services = this.getAll();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        services[index] = {
            ...services[index],
            ...updateData,
            id: services[index].id
        };

        fs.writeFileSync(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return services[index];
    }

    delete(id) {
        const services = this.getAll();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services.splice(index, 1)[0];

        fs.writeFileSync(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return deletedService;
    }
}

export default ServicesDAO;