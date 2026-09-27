import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";

class BookingsService {
    constructor() {
        this.repository = new BookingsRepository();
        this.servicesRepository = new ServicesRepository();
    }

    createBooking(bookingData) {
        const booking = {
            ...bookingData,
            services: []
        };

        return this.repository.create(booking);
    }

    getBookingById(id) {
        return this.repository.getById(id);
    }

    addServiceToBooking(bookingId, serviceId) {
        const booking = this.repository.getById(bookingId);

        if (!booking) {
            return null;
        }

        const service = this.servicesRepository.getById(serviceId);

        if (!service) {
            return undefined;
        }

        const services = [...booking.services];

        const existingService = services.find(
            item => item.service === Number(serviceId)
        );

        if (existingService) {
            existingService.quantity++;
        } else {
            services.push({
                service: Number(serviceId),
                quantity: 1
            });
        }

        return this.repository.update(bookingId, {
            services
        });
    }
}

export default BookingsService;