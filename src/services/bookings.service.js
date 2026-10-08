import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesService from "./services.service.js";

class BookingsService {
    constructor() {
        this.repository = new BookingsRepository();
        this.servicesService = new ServicesService();
    }

    async createBooking(bookingData) {
        const booking = {
            ...bookingData,
            services: []
        };

        return await this.repository.create(booking);
    }
    async getBookings() {
       return await this.repository.getAll();
    }

    async getBookingById(id) {
        return await this.repository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        const booking = await this.repository.getById(bookingId);

        if (!booking) {
            return null;
        }

        const service = await this.servicesService.getServiceById(serviceId);

        if (!service) {
            return undefined;
        }

        const existingService = booking.services.find(
            item => item.service.toString() === serviceId.toString()
        );

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({
                service: serviceId,
                quantity: 1
            });
        }
        console.log(booking.services);
        return await this.repository.update(
            bookingId,
            { services: booking.services }
        );
    }
}

export default BookingsService;