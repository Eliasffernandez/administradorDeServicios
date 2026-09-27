import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    getServices(filters = {}) {
        let services = this.repository.getAll();

        const { category, available } = filters;

        if (category) {
            services = services.filter(
                service => service.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (available !== undefined) {
            services = services.filter(
                service => service.available === (available === "true")
            );
        }

        return services;
    }

    getServiceById(id) {
        return this.repository.getById(id);
    }

    createService(serviceData) {
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
            throw new Error(
                `Faltan campos: ${missingFields.join(", ")}`
            );
        }

        return this.repository.create(serviceData);
    }

    updateService(id, updateData) {
        return this.repository.update(id, updateData);
    }

    deleteService(id) {
        return this.repository.delete(id);
    }
}

export default ServicesService;