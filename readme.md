# Administrador de Servicios

## Descripción

Este proyecto consiste en un administrador de servicios para un sistema de turnos y reservas.

Se utiliza Node.js con módulos ESM y una clase `ServiceManager` para agregar, buscar, modificar y eliminar servicios. Los servicios se guardan en el archivo `services.json`.

## Instalación

Para instalar el proyecto hay que ejecutar:

```bash
npm install
```

## Ejecución

Para iniciar el proyecto:

```bash
npm start
```
## Variables de entorno

El proyecto utiliza las siguientes variables:

```env
PORT=
NODE_ENV=
```

Para trabajar localmente se utiliza un archivo `.env` con:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` no se sube a GitHub.

## Servicios

Cada servicio tiene los siguientes datos:

* `id`: identificador del servicio.
* `name`: nombre del servicio.
* `description`: descripción del servicio.
* `duration`: duración del servicio.
* `price`: precio del servicio.
* `category`: categoría del servicio.
* `available`: indica si el servicio está disponible.

Ejemplo:

```js
{
    id: 1,
    name: "Lavado de auto",
    description: "Lavado completo",
    duration: 60,
    price: 8000,
    category: "Automotor",
    available: true
}
```

## ServiceManager

La clase `ServiceManager` tiene los siguientes métodos:

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

Si el servicio no existe devuelve `null`.

### addService(serviceData)

Agrega un nuevo servicio.

El ID se genera automáticamente, por lo que no es necesario enviarlo.

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

El método valida que estén todos los campos necesarios.

### updateService(id, updatedData)

Permite modificar los datos de un servicio existente.

```js
serviceManager.updateService(1, {
    price: 9000
});
```

El ID del servicio no se puede modificar.

### deleteService(id)

Elimina un servicio existente.

```js
serviceManager.deleteService(1);
```

Si el servicio no existe devuelve `null`.

## Tecnologías utilizadas

* Node.js
* JavaScript
* ESM
* dotenv
* JSON
* Git y GitHub
