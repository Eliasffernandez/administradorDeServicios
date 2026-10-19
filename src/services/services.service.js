import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        const {
            category,
            available,
            page = 1,
            limit = 10,
            sortBy = "name",
            order = "asc"
        } = filters;

        const mongoFilters = {};

        if (category) {
            mongoFilters.category = {
                $regex: category,
                $options: "i"
            };
        }

        if (available !== undefined) {
            mongoFilters.available = available === "true";
        }

        const paginationOptions = {
            page: Number(page),
            limit: Number(limit),
            sortBy,
            order
        };

        const { services, total } =
            await this.repository.getPaginated(
                mongoFilters,
                paginationOptions
            );

        const totalPages = Math.ceil(
            total / paginationOptions.limit
        );

        return {
            services,
            total,
            page: paginationOptions.page,
            limit: paginationOptions.limit,
            totalPages,
            hasPrevPage: paginationOptions.page > 1,
            hasNextPage: paginationOptions.page < totalPages
        };
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