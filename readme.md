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
```

Estas variables se configuran en un archivo `.env`.

El archivo `.env` no se incluye en el repositorio.

## Estructura del proyecto

```text
src/
├── app.js
├── config/
│   └── env.config.js
├── data/
│   ├── services.json
│   └── bookings.json
├── managers/
│   ├── BookingManager.js
│   └── ServiceManager.js
└── routes/
    ├── bookings.router.js
    └── services.router.js

server.js
package.json
.gitignore
README.md
```

## Arquitectura

### server.js

`server.js` se encarga de iniciar el servidor y escuchar en el puerto configurado.

### app.js

`app.js` configura Express, habilita el procesamiento de datos en formato JSON y registra los routers de servicios y reservas.

Los endpoints se encuentran organizados en los archivos correspondientes dentro de la carpeta `routes`.

## Servicios

Cada servicio contiene los siguientes datos:

- `id`: identificador generado automáticamente.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: indica si el servicio está disponible.

Ejemplo:

```json
{
    "id": 1,
    "name": "Lavado de auto",
    "description": "Lavado completo",
    "duration": 60,
    "price": 8000,
    "category": "Automotor",
    "available": true
}
```

## ServiceManager

La clase `ServiceManager` se encarga de administrar los servicios y su persistencia en `services.json`.

Cuenta con los siguientes métodos:

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
    "service": 1,
    "quantity": 1
}
```

Si se agrega nuevamente el mismo servicio a una reserva, se incrementa su `quantity`.

Ejemplo:

```json
{
    "id": 1,
    "clientName": "Juan Perez",
    "clientEmail": "juan@gmail.com",
    "date": "2026-09-15",
    "time": "15:00",
    "status": "pending",
    "services": [
        {
            "service": 1,
            "quantity": 2
        }
    ]
}
```

## BookingManager

La clase `BookingManager` se encarga de administrar las reservas y su persistencia en `bookings.json`.

Cuenta con los siguientes métodos:

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

La información se almacena mediante FileSystem en archivos JSON:

```text
src/data/services.json
src/data/bookings.json
```

Los datos se leen y escriben directamente en estos archivos, permitiendo mantener la información almacenada aunque se reinicie el servidor.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ESM
- FileSystem
- dotenv
- JSON
- Git
- GitHub