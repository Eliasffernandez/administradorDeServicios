import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        let services = await this.repository.getAll();

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

    async getServiceById(id) {
        return await this.repository.getById(id);
    }

    async createService(serviceData) {
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

        return await this.repository.create(serviceData);
    }

    async updateService(id, updateData) {
        return await this.repository.update(id, updateData);
    }

    async deleteService(id) {
        return await this.repository.delete(id);
    }
}

export default ServicesService;