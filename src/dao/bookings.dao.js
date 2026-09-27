import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/bookings.json");

class BookingsDAO {
    getAll() {
        const data = fs.readFileSync(filePath, "utf-8");

        return JSON.parse(data);
    }

    getById(id) {
        const bookings = this.getAll();

        return bookings.find(
            booking => booking.id === Number(id)
        ) || null;
    }

    create(bookingData) {
        const bookings = this.getAll();

        const newId = bookings.length > 0
            ? Math.max(...bookings.map(booking => booking.id)) + 1
            : 1;

        const newBooking = {
            id: newId,
            ...bookingData
        };

        bookings.push(newBooking);

        fs.writeFileSync(
            filePath,
            JSON.stringify(bookings, null, 2)
        );

        return newBooking;
    }

    update(id, updateData) {
        const bookings = this.getAll();

        const index = bookings.findIndex(
            booking => booking.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = {
            ...bookings[index],
            ...updateData,
            id: bookings[index].id
        };

        fs.writeFileSync(
            filePath,
            JSON.stringify(bookings, null, 2)
        );

        return bookings[index];
    }
}

export default BookingsDAO;