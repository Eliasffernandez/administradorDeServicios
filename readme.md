# Administrador de Servicios

## Descripción

Este proyecto consiste en una API REST para la gestión de servicios y reservas de un sistema de turnos.

La aplicación está desarrollada con Node.js y Express, utilizando módulos ESM, MongoDB y Mongoose para la persistencia de datos.

Además, el proyecto incorpora vistas dinámicas con Handlebars y comunicación en tiempo real mediante Socket.io.

La aplicación administra dos recursos principales:

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
│   ├── bookings.controller.js
│   └── views.controller.js
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
│   ├── bookings.router.js
│   └── views.router.js
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── services.handlebars
│   └── availability.handlebars
│
└── app.js

public/
├── css/
│   └── styles.css
└── js/
    └── socket.js

server.js
package.json
.env.example
.gitignore
README.md
```

## Arquitectura

La API está organizada utilizando una arquitectura en capas, separando las responsabilidades de cada parte de la aplicación.

El flujo de una petición es:

```text
Router → Controller → Service → Repository → DAO → Model → MongoDB
```

Las vistas de Handlebars también utilizan las mismas capas para obtener la información desde MongoDB.

## Servicios

Cada servicio contiene los siguientes datos:

- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: indica si el servicio está disponible.

MongoDB genera automáticamente el identificador `_id` para cada servicio.

Ejemplo:

```json
{
    "_id": "6ab9d2b519f01d1d5f959845",
    "name": "Lavado de auto",
    "description": "Lavado completo",
    "duration": 60,
    "price": 8000,
    "category": "Automotor",
    "available": true
}
```

## Capas de Services

El recurso `services` está organizado en diferentes capas:

- `services.service.js`: contiene la lógica de negocio de los servicios.
- `services.repository.js`: comunica el service con el DAO.
- `services.dao.js`: realiza las operaciones sobre MongoDB mediante el modelo correspondiente.
- `services.controller.js`: recibe las solicitudes HTTP y devuelve las respuestas.
- `services.router.js`: define los endpoints relacionados con los servicios.
- `service.model.js`: define el esquema de los servicios en MongoDB.

### Obtener servicios

Devuelve todos los servicios disponibles en MongoDB.

```text
GET /api/services
```

También permite aplicar filtros mediante query parameters.

```text
GET /api/services?category=Automotor
```

```text
GET /api/services?available=true
```

### Obtener un servicio por ID

```text
GET /api/services/:sid
```

### Crear un servicio

```text
POST /api/services
```

Ejemplo de datos:

```json
{
    "name": "Lavado de auto",
    "description": "Lavado completo",
    "duration": 60,
    "price": 8000,
    "category": "Automotor",
    "available": true
}
```

### Modificar un servicio

```text
PUT /api/services/:sid
```

Ejemplo:

```json
{
    "price": 9000
}
```

### Eliminar un servicio

```text
DELETE /api/services/:sid
```

## Reservas

Cada reserva contiene los siguientes datos:

- `_id`: identificador generado automáticamente por MongoDB.
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

La propiedad `service` utiliza un ObjectId de MongoDB asociado al modelo `Service`.

Si se agrega nuevamente el mismo servicio a una reserva, se incrementa su `quantity`.

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
            "quantity": 3
        }
    ]
}
```

## Capas de Bookings

El recurso `bookings` está organizado en diferentes capas:

- `bookings.service.js`: contiene la lógica de negocio de las reservas.
- `bookings.repository.js`: comunica el service con el DAO.
- `bookings.dao.js`: realiza las operaciones sobre MongoDB mediante el modelo correspondiente.
- `bookings.controller.js`: recibe las solicitudes HTTP y devuelve las respuestas.
- `bookings.router.js`: define los endpoints relacionados con las reservas.
- `booking.model.js`: define el esquema de las reservas en MongoDB.

Cuando se agrega un servicio a una reserva, si el mismo servicio ya se encuentra asociado, se incrementa su `quantity`.

### Crear una reserva

```text
POST /api/bookings
```

Ejemplo:

```json
{
    "clientName": "Juan Perez",
    "clientEmail": "juan@gmail.com",
    "date": "2026-09-28",
    "time": "15:00",
    "status": "pending"
}
```

La reserva se crea inicialmente con `services` vacío.

### Obtener una reserva por ID

```text
GET /api/bookings/:bid
```

### Agregar un servicio a una reserva

```text
POST /api/bookings/:bid/services/:sid
```

Si el servicio ya se encuentra dentro de la reserva, se incrementa su cantidad.

## Vistas con Handlebars

El proyecto incorpora vistas dinámicas utilizando Handlebars.

### Servicios

La vista:

```text
GET /views/services
```

muestra los servicios obtenidos desde MongoDB.

La información mostrada incluye:

- Nombre.
- Descripción.
- Duración.
- Precio.
- Categoría.
- Disponibilidad.

### Disponibilidad de reservas

La vista:

```text
GET /views/availability
```

muestra las reservas obtenidas desde MongoDB.

La información mostrada incluye:

- Cliente.
- Email.
- Fecha.
- Horario.
- Estado.
- Servicios asociados.
- Cantidad de cada servicio.

Las vistas no utilizan datos hardcodeados, sino que reciben la información desde las capas de la aplicación.

## Comunicación en tiempo real

El proyecto utiliza Socket.io para actualizar información en el navegador sin necesidad de recargar la página.

Cuando se agrega un servicio a una reserva mediante:

```text
POST /api/bookings/:bid/services/:sid
```

el servidor emite el evento:

```text
bookingUpdated
```

El cliente escucha este evento mediante:

```text
public/js/socket.js
```

y actualiza la información de la reserva mostrada en la vista `/views/availability`.

Por ejemplo, si la cantidad de un servicio pasa de:

```text
2
```

a:

```text
3
```

la cantidad se actualiza automáticamente en el navegador sin realizar una recarga de la página.

## Persistencia

La información se almacena en MongoDB Atlas utilizando Mongoose.

Los principales modelos utilizados son:

- `Service`
- `Booking`
- `Message`

Los DAO utilizan estos modelos para realizar las operaciones de creación, consulta, modificación y eliminación de datos.

La conexión con MongoDB se realiza mediante la variable de entorno:

```env
MONGO_URI=
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

### Views

#### Ver servicios

```text
GET /views/services
```

#### Ver disponibilidad

```text
GET /views/availability
```

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ESM
- Mongoose
- MongoDB Atlas
- Handlebars
- Socket.io
- dotenv
- Git
- GitHub