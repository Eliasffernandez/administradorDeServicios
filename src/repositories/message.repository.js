import MessagesDAO from "../dao/messages.dao.js";

class MessagesRepository {
    constructor() {
        this.dao = new MessagesDAO();
    }

    create(message) {
        return this.dao.create(message);
    }

    getAll() {
        return this.dao.getAll();
    }

    getById(id) {
        return this.dao.getById(id);
    }

    update(id, updateData) {
        return this.dao.update(id, updateData);
    }

    delete(id) {
        return this.dao.delete(id);
    }
}

export default MessagesRepository;