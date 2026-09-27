import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

export const getServices = (req, res) => {
    const services = servicesService.getServices(req.query);

    res.status(200).json(services);
};

export const getServiceById = (req, res) => {
    const service = servicesService.getServiceById(req.params.sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
};

export const createService = (req, res) => {
    try {
        const newService = servicesService.createService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const updateService = (req, res) => {
    const service = servicesService.updateService(
        req.params.sid,
        req.body
    );

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
};

export const deleteService = (req, res) => {
    const deletedService = servicesService.deleteService(req.params.sid);

    if (!deletedService) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(deletedService);
};