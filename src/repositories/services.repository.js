import ServicesDAO from "../dao/services.dao.js";

class ServicesRepository {
    constructor() {
        this.dao = new ServicesDAO();
    }

    getAll() {
        return this.dao.getAll();
    }

    getById(id) {
        return this.dao.getById(id);
    }

    create(service) {
        return this.dao.create(service);
    }

    update(id, updateData) {
        return this.dao.update(id, updateData);
    }

    delete(id) {
        return this.dao.delete(id);
    }
}

export default ServicesRepository;