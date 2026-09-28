import Message from "../models/message.model.js";

class MessagesDAO {

    create(message) {
        return Message.create(message);
    }
    getAll() {
        return Message.find();
    }
    getById(id) {
        return Message.findById(id);
    }

    update(id, updateData) {
        return Message.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
    }

    delete(id) {
        return Message.findByIdAndDelete(id);
    }
}

export default MessagesDAO;
