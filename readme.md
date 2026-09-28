# Administrador de Servicios

## Descripción

Este proyecto consiste en una API REST para la gestión de servicios y reservas de un sistema de turnos.

La aplicación está desarrollada con Node.js y Express, utilizando módulos ESM y FileSystem para persistir la información en archivos JSON.

La API administra dos recursos principales:

- `services`: servicios disponibles para reservar.
- `bookings`: reservas realizadas por los clientes.

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor se ejecutará en:

```text
http://localhost:8080
```

## Variables de entorno

El proyecto utiliza las siguientes variables de entorno:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=
```

Estas variables se configuran en un archivo `.env`.

El archivo `.env` no se incluye en el repositorio.


## Estructura del proyecto

```text
src/
├── config/
│   ├── env.config.js
│   └── database.config.js
│
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
│
├── services/
│   ├── services.service.js
│   └── bookings.service.js
│
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
│
├── dao/
│   ├── services.dao.js
│   └── bookings.dao.js
│
├── models/
│   ├── service.model.js
│   ├── booking.model.js
│   └── message.model.js
│
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
│
└── app.js

server.js
package.json
.env.example
.gitignore
README.md


## Arquitectura

La API está organizada utilizando una arquitectura en capas, separando las responsabilidades de cada parte de la aplicación.

El flujo de una petición es:

```text
Router → Controller → Service → Repository → DAO → Model → MongoDB

## Servicios

Cada servicio contiene los siguientes datos:

- `id`: identificador generado automáticamente.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: indica si el servicio está disponible.

MongoDB genera automáticamente el identificador _id para cada servicio.

Ejemplo:


{
    "_id": "6ab9d2b519f01d1d5f959845",
    "name": "Lavado de auto",
    "description": "Lavado completo",
    "duration": 60,
    "price": 8000,
    "category": "Automotor",
    "available": true
}


## Capas de Services

El recurso `services` está organizado en diferentes capas:

- `services.service.js`: contiene la lógica de negocio de los servicios.
- `services.repository.js`: comunica el service con el DAO.
- `services.dao.js`: realiza la lectura y escritura de `services.json`.
- `services.controller.js`: recibe las solicitudes HTTP y devuelve las respuestas.
- `services.router.js`: define los endpoints relacionados con los servicios.

### getServices()

Devuelve todos los servicios.

```js
serviceManager.getServices();
```

### getServiceById(id)

Busca un servicio por su ID.

```js
serviceManager.getServiceById(1);
```

Si el servicio no existe, devuelve `null`.

### addService(serviceData)

Agrega un nuevo servicio.

El ID se genera automáticamente.

```js
serviceManager.addService({
    name: "Lavado de auto",
    description: "Lavado completo",
    duration: 60,
    price: 8000,
    category: "Automotor",
    available: true
});
```

### updateService(id, updateData)

Permite modificar los datos de un servicio existente.

```js
serviceManager.updateService(1, {
    price: 9000
});
```

El ID del servicio no puede ser modificado.

### deleteService(id)

Elimina un servicio existente.

```js
serviceManager.deleteService(1);
```

Si el servicio no existe, devuelve `null`.

## Reservas

Cada reserva contiene los siguientes datos:

- `id`: identificador generado automáticamente.
- `clientName`: nombre del cliente.
- `clientEmail`: email del cliente.
- `date`: fecha de la reserva.
- `time`: horario de la reserva.
- `status`: estado de la reserva.
- `services`: servicios asociados a la reserva.

Los servicios dentro de una reserva se almacenan mediante un objeto que contiene el ID del servicio y su cantidad.

Ejemplo:

```json
{
    "service": "6ab9d2b519f01d1d5f959845",
    "quantity": 1
}
```
La propiedad service utiliza un ObjectId de MongoDB asociado al modelo Service.

Si se agrega nuevamente el mismo servicio a una reserva, se incrementa su quantity.

Ejemplo:

```json
{
    "_id": "6ab9dcee95a6983147c2ca61",
    "clientName": "Juan Perez",
    "clientEmail": "juan@gmail.com",
    "date": "2026-09-28",
    "time": "15:00",
    "status": "pending",
    "services": [
        {
            "service": "6ab9d2b519f01d1d5f959845",
            "quantity": 2
        }
    ]
}
```

## Capas de Bookings

El recurso `bookings` está organizado en diferentes capas:

- `bookings.service.js`: contiene la lógica de negocio de las reservas.
- `bookings.repository.js`: comunica el service con el DAO.
- `bookings.dao.js`: realiza la lectura y escritura de `bookings.json`.
- `bookings.controller.js`: recibe las solicitudes HTTP y devuelve las respuestas.
- `bookings.router.js`: define los endpoints relacionados con las reservas.
- `booking.model.js`: define el esquema de las reservas en MongoDB

Cuando se agrega un servicio a una reserva, si el mismo servicio ya se encuentra asociado, se incrementa su `quantity`.

### createBooking(bookingData)

Crea una nueva reserva y genera automáticamente su ID.

```js
bookingManager.createBooking({
    clientName: "Juan Perez",
    clientEmail: "juan@gmail.com",
    date: "2026-09-15",
    time: "15:00",
    status: "pending"
});
```

La reserva se crea inicialmente con `services` vacío.

### getBookingById(id)

Busca una reserva por su ID.

```js
bookingManager.getBookingById(1);
```

Si la reserva no existe, devuelve `null`.

### addServiceToBooking(bookingId, serviceId)

Agrega un servicio a una reserva existente.

Si el servicio ya se encuentra dentro de la reserva, incrementa su cantidad.

```js
bookingManager.addServiceToBooking(1, 1);
```

## Endpoints

### Services

#### Obtener todos los servicios

```text
GET /api/services
```

#### Filtrar por categoría

```text
GET /api/services?category=Automotor
```

#### Filtrar por disponibilidad

```text
GET /api/services?available=true
```

#### Obtener un servicio por ID

```text
GET /api/services/:sid
```

#### Crear un servicio

```text
POST /api/services
```

#### Modificar un servicio

```text
PUT /api/services/:sid
```

#### Eliminar un servicio

```text
DELETE /api/services/:sid
```

### Bookings

#### Crear una reserva

```text
POST /api/bookings
```

#### Obtener una reserva por ID

```text
GET /api/bookings/:bid
```

#### Agregar un servicio a una reserva

```text
POST /api/bookings/:bid/services/:sid
```

## Persistencia

## Persistencia

La información se almacena en MongoDB Atlas utilizando Mongoose.

Los documentos se organizan mediante los siguientes modelos:

Service
Booking
Message

Los DAO utilizan estos modelos para realizar las operaciones de creación, consulta, modificación y eliminación de datos.

La conexión con MongoDB se realiza mediante la variable de entorno MONGO_URI.

Tecnologías utilizadas
Node.js
Express
JavaScript
ESM
Mongoose
MongoDB Atlas
dotenv
Git
GitHub