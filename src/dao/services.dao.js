import Service from "../models/service.model.js";

class ServicesDAO {

    getAll() {
        return Service.find().lean();
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