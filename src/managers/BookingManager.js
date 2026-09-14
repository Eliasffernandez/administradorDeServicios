import fs from "fs";
import path from "path";

class BookingManager {
    constructor() {
        this.path = path.resolve("src/data/bookings.json");
    }

    createBooking(bookingData) {
        const bookings = this.getBookings();

        const newId = bookings.length > 0
            ? Math.max(...bookings.map(booking => booking.id)) + 1
            : 1;

        const newBooking = {
            id: newId,
            ...bookingData,
            services: []
        };

        bookings.push(newBooking);

        fs.writeFileSync(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return newBooking;
    }

    getBookings() {
        const bookings = fs.readFileSync(this.path, "utf-8");

        return JSON.parse(bookings);
    }

    getBookingById(id) {
        const bookings = this.getBookings();

        return bookings.find(
            booking => booking.id === Number(id)
        ) || null;
    }

    addServiceToBooking(bookingId, serviceId) {
        const bookings = this.getBookings();

        const booking = bookings.find(
            booking => booking.id === Number(bookingId)
        );

        if (!booking) {
            return null;
        }

        const existingService = booking.services.find(
            item => item.service === Number(serviceId)
        );

        if (existingService) {
            existingService.quantity++;
        } else {
            booking.services.push({
                service: Number(serviceId),
                quantity: 1
            });
        }

        fs.writeFileSync(
            this.path,
            JSON.stringify(bookings, null, 2)
        );

        return booking;
    }
}

export default BookingManager;