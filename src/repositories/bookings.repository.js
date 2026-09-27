import BookingsDAO from "../dao/bookings.dao.js";

class BookingsRepository {
    constructor() {
        this.dao = new BookingsDAO();
    }

    create(bookingData) {
        return this.dao.create(bookingData);
    }

    getById(id) {
        return this.dao.getById(id);
    }

    update(id, updateData) {
        return this.dao.update(id, updateData);
    }
}

export default BookingsRepository;