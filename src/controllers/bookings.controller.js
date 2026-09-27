import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export const createBooking = (req, res) => {
    const booking = bookingsService.createBooking(req.body);

    res.status(201).json(booking);
};

export const getBookingById = (req, res) => {
    const booking = bookingsService.getBookingById(req.params.bid);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
};

export const addServiceToBooking = (req, res) => {
    const booking = bookingsService.addServiceToBooking(
        req.params.bid,
        req.params.sid
    );

    if (booking === undefined) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    if (booking === null) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
};