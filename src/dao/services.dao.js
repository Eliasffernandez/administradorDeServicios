import Service from "../models/service.model.js";

class ServicesDAO {

    getAll() {
        return Service.find().lean();
    }

    async getPaginated(filters, options) {
        const { page, limit, sortBy, order } = options;

        const sortOrder = order === "desc" ? -1 : 1;

        const [services, total] = await Promise.all([
            Service.find(filters)
                .sort({ [sortBy]: sortOrder })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),

            Service.countDocuments(filters)
        ]);

        return { services, total };
    }

    getById(id) {
        return Service.findById(id);
    }

    create(service) {
        return Service.create(service);
    }

    update(id, updateData) {
        return Service.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
    }

    delete(id) {
        return Service.findByIdAndDelete(id);
    }
}

export default ServicesDAO;