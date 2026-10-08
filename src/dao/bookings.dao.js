import Booking from "../models/booking.model.js";

class BookingsDAO {

    create(booking) {
        return Booking.create(booking);
    }

    getAll() {
       return Booking.find().lean();
    }

    getById(id) {
        return Booking.findById(id);
    }

    update(id, updateData) {
        return Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
    }
}

export default BookingsDAO;




