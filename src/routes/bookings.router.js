import express from "express";
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const router = express.Router();

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

router.post("/", (req, res) => {
    const requiredFields = [
        "clientName",
        "clientEmail",
        "date",
        "time",
        "status"
    ];

    const missingFields = requiredFields.filter(
        field => req.body[field] === undefined
    );

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Faltan campos: ${missingFields.join(", ")}`
        });
    }

    const booking = bookingManager.createBooking(req.body);

    res.status(201).json(booking);
});

router.get("/:bid", (req, res) => {
    const booking = bookingManager.getBookingById(req.params.bid);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.status(200).json(booking);
});

router.post("/:bid/services/:sid", (req, res) => {
    const booking = bookingManager.getBookingById(req.params.bid);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    const service = serviceManager.getServiceById(req.params.sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    const updatedBooking = bookingManager.addServiceToBooking(
        req.params.bid,
        req.params.sid
    );

    res.status(200).json(updatedBooking);
});

export default router;