const socket = io();

socket.on("bookingUpdated", (booking) => {
    const bookingElement = document.querySelector(
        `[data-booking-id="${booking._id}"]`
    );

    if (!bookingElement) {
        return;
    }

    const servicesList = bookingElement.querySelector(".booking-services");

    servicesList.innerHTML = "";

    booking.services.forEach(item => {
        const li = document.createElement("li");

        li.textContent = `Servicio ${item.service} - Cantidad: ${item.quantity}`;

        servicesList.appendChild(li);
    });
});


