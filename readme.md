# Administrador de Servicios

## Descripción

Este proyecto consiste en una API REST para la gestión de servicios y reservas de un sistema de turnos.

La aplicación está desarrollada con Node.js y Express, utilizando módulos ESM. La persistencia de datos se realiza mediante MongoDB Atlas y Mongoose.

Además, incorpora vistas dinámicas con Express Handlebars y comunicación en tiempo real mediante Socket.IO.

Los recursos principales son:

- `services`: servicios disponibles para reservar.
- `bookings`: reservas realizadas por los clientes.

El proyecto utiliza una arquitectura en capas para separar las responsabilidades y facilitar el mantenimiento del código.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ECMAScript Modules (ESM)
- MongoDB Atlas
- Mongoose
- Zod
- Express Handlebars
- Socket.IO
- dotenv
- Git y GitHub

## Instalación

Clonar el repositorio e ingresar a la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=tu_uri_de_mongodb
```

Reemplazar `tu_uri_de_mongodb` por la URI de conexión correspondiente a MongoDB Atlas.

**Importante:** no subir el archivo `.env` al repositorio, ya que contiene información sensible. El proyecto incluye `.env.example` como referencia para configurar las variables necesarias.

## Ejecución

Iniciar el servidor con:

```bash
npm start
```

Por defecto, la aplicación utiliza el puerto `8080`.

La API queda disponible en:

```text
http://localhost:8080
```

## Arquitectura del proyecto

La aplicación organiza la lógica en diferentes capas:

```text
Router → Controller → Service → Repository → DAO → Model → MongoDB
```

Cada capa tiene una responsabilidad específica:

- **Router:** define los endpoints y conecta las peticiones con los middlewares y controladores.
- **Controller:** recibe las solicitudes HTTP y devuelve las respuestas.
- **Service:** contiene la lógica de negocio.
- **Repository:** actúa como intermediario entre la capa de servicios y el DAO.
- **DAO:** realiza las operaciones de persistencia mediante Mongoose.
- **Model:** define el esquema de los documentos almacenados en MongoDB.

Las vistas también utilizan las capas de la aplicación para obtener la información que muestran.

## Estructura del proyecto

La estructura principal es la siguiente:

```text
src/
├── config/
│   ├── env.config.js
│   └── database.config.js
├── controllers/
│   ├── services.controller.js
│   ├── bookings.controller.js
│   └── views.controller.js
├── services/
│   ├── services.service.js
│   └── bookings.service.js
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
├── dao/
│   ├── services.dao.js
│   └── bookings.dao.js
├── models/
│   ├── service.model.js
│   ├── booking.model.js
│   └── message.model.js
├── routes/
│   ├── services.router.js
│   ├── bookings.router.js
│   └── views.router.js
├── validations/
│   ├── service.validation.js
│   └── booking.validation.js
├── middlewares/
│   └── validate.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── services.handlebars
│   └── availability.handlebars
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

Esta estructura representa los archivos principales del proyecto. Pueden existir otros archivos auxiliares dentro de las carpetas.

## Servicios

Cada servicio contiene los siguientes campos:

- `_id`: identificador generado por MongoDB.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: indica si el servicio está disponible.

Ejemplo de un servicio:

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

### Endpoints de servicios

#### Obtener servicios

```http
GET /api/services
```

Devuelve los servicios registrados y los metadatos de paginación.

#### Filtrar por categoría

```http
GET /api/services?category=Automotor
```

Permite filtrar los servicios por categoría.

#### Filtrar por disponibilidad

```http
GET /api/services?available=true
```

Permite consultar servicios disponibles. También se puede utilizar `available=false`.

#### Aplicar paginación

```http
GET /api/services?page=1&limit=10
```

Los parámetros disponibles son:

- `page`: número de página.
- `limit`: cantidad máxima de servicios por página.

#### Ordenar resultados

```http
GET /api/services?sortBy=name&order=asc
```

- `sortBy`: campo por el cual ordenar los resultados.
- `order`: dirección del ordenamiento, `asc` o `desc`.

Los filtros, la paginación y el ordenamiento se pueden combinar:

```http
GET /api/services?category=Automotor&available=true&page=1&limit=10&sortBy=name&order=asc
```

La respuesta de la consulta paginada incluye:

- `services`: servicios correspondientes a la página.
- `total`: cantidad total de resultados que coinciden con los filtros.
- `page`: página actual.
- `limit`: cantidad de resultados por página.
- `totalPages`: cantidad total de páginas.
- `hasPrevPage`: indica si existe una página anterior.
- `hasNextPage`: indica si existe una página siguiente.

#### Obtener un servicio por ID

```http
GET /api/services/:sid
```

#### Crear un servicio

```http
POST /api/services
```

Ejemplo de cuerpo JSON:

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

#### Actualizar un servicio

```http
PUT /api/services/:sid
```

Ejemplo de cuerpo JSON:

```json
{
  "price": 9000
}
```

#### Eliminar un servicio

```http
DELETE /api/services/:sid
```

## Reservas

Cada reserva contiene los siguientes campos:

- `_id`: identificador generado por MongoDB.
- `clientName`: nombre del cliente.
- `clientEmail`: correo electrónico del cliente.
- `date`: fecha de la reserva.
- `time`: horario de la reserva.
- `status`: estado de la reserva.
- `services`: servicios asociados a la reserva y sus cantidades.

Ejemplo de una reserva:

```json
{
  "_id": "6ad65579809b903488de851f",
  "clientName": "Prueba Populate",
  "clientEmail": "prueba@gmail.com",
  "date": "2026-10-01",
  "time": "15:00",
  "status": "pending",
  "services": []
}
```

### Crear una reserva

```http
POST /api/bookings
```

Ejemplo de cuerpo JSON:

```json
{
  "clientName": "Juan Perez",
  "clientEmail": "juan@gmail.com",
  "date": "2026-09-28",
  "time": "15:00",
  "status": "pending"
}
```

La reserva se crea inicialmente con la colección `services` vacía.

### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

Permite consultar una reserva por su identificador.

La consulta utiliza `populate` para recuperar los datos completos de los servicios relacionados.

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Los parámetros son:

- `bid`: identificador de la reserva.
- `sid`: identificador del servicio.

Esta petición no necesita un cuerpo JSON. Los identificadores se envían en la URL.

Si el servicio todavía no está asociado a la reserva, se agrega con cantidad `1`. Si ya existe, se incrementa su cantidad.

## Relaciones y populate

El modelo `Booking` almacena una referencia al modelo `Service` mediante un `ObjectId` de MongoDB.

Cada elemento de `services` contiene:

```json
{
  "service": "6ab9d2b519f01d1d5f959845",
  "quantity": 1
}
```

La propiedad `service` referencia un documento del modelo `Service`.

En el DAO de reservas se utiliza:

```js
.populate("services.service")
```

Esto permite que, al consultar una reserva, Mongoose reemplace la referencia por los datos completos del servicio relacionado.

Por ejemplo:

```json
{
  "services": [
    {
      "service": {
        "_id": "6ab9d31319f01d1d5f959846",
        "name": "Cambio de aceite",
        "description": "Cambio de aceite y filtro",
        "duration": 45,
        "price": 12000,
        "category": "Automotor",
        "available": true
      },
      "quantity": 1
    }
  ]
}
```

## Validaciones con Zod

El proyecto utiliza Zod para validar los datos recibidos por la API antes de ejecutar las operaciones de negocio.

Las validaciones se organizan en la carpeta `src/validations/` y se aplican mediante el middleware `src/middlewares/validate.js`.

Se validan las siguientes operaciones:

- Creación de servicios.
- Actualización de servicios.
- Creación de reservas.
- Identificadores de reserva y servicio al agregar un servicio a una reserva.

Si los datos no cumplen con el esquema correspondiente, la API responde con estado HTTP `400` y un objeto JSON con el error y el detalle de los campos inválidos.

Ejemplo:

```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "field": "name",
      "message": "El nombre es obligatorio"
    }
  ]
}
```

Los identificadores utilizados en las rutas que validan parámetros deben respetar el formato esperado de un ObjectId de MongoDB.

Cuando un identificador tiene un formato válido, pero no corresponde a un documento existente, la API puede responder con `404 Not Found`.

## Vistas con Handlebars

El proyecto incorpora vistas dinámicas mediante Express Handlebars.

### Servicios

```http
GET /views/services
```

Muestra los servicios obtenidos desde MongoDB, incluyendo nombre, descripción, duración, precio, categoría y disponibilidad.

### Disponibilidad de reservas

```http
GET /views/availability
```

Muestra información de las reservas, como cliente, correo electrónico, fecha, horario, estado, servicios asociados y cantidades.

Las vistas reciben información de la aplicación y no dependen de datos hardcodeados.

## Comunicación en tiempo real

El proyecto utiliza Socket.IO para comunicar actualizaciones entre el servidor y el navegador.

Cuando se agrega un servicio a una reserva, el servidor emite el evento:

```text
bookingUpdated
```

El cliente escucha este evento desde:

```text
public/js/socket.js
```

De esta manera, la interfaz puede actualizar la información de la reserva sin necesidad de recargar la página.

## Persistencia de datos

La persistencia se realiza en MongoDB Atlas mediante Mongoose.

Los modelos principales son:

- `Service`
- `Booking`
- `Message`

Los DAO utilizan los modelos para ejecutar operaciones de creación, consulta, actualización y eliminación de documentos, según las operaciones implementadas para cada recurso.

La conexión se configura mediante la variable de entorno `MONGO_URI`.

## Pruebas realizadas

Durante el desarrollo se probaron en Postman las siguientes funcionalidades:

- Consulta de servicios.
- Filtro por categoría y disponibilidad.
- Paginación y metadatos de navegación.
- Validación de creación de servicios.
- Validación de actualización de servicios.
- Creación de reservas con validación de datos.
- Asociación de servicios a reservas.
- Incremento de la cantidad de un servicio asociado.
- Validación del formato de los identificadores.
- Manejo de servicios inexistentes.
- Consulta de reservas con `populate`.

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Consultar servicios con filtros y paginación |
| GET | `/api/services/:sid` | Consultar un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Consultar una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |
| GET | `/views/services` | Ver servicios |
| GET | `/views/availability` | Ver disponibilidad de reservas |

## Autor

Proyecto desarrollado como parte del aprendizaje de Node.js, Express y desarrollo de APIs REST.
