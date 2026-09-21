import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = (req, res) => {
    const booking = bookingManager.createBooking(req.body);

    res.status(201).json(booking);
};

export const getBookingById = (req, res) => {
    const booking = bookingManager.getBookingById(req.params.bid);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
};

export const addServiceToBooking = (req, res) => {
    const service = serviceManager.getServiceById(req.params.sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    const booking = bookingManager.addServiceToBooking(
        req.params.bid,
        req.params.sid
    );

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
};