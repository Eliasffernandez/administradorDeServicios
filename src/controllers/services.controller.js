import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
    const services = await servicesService.getServices(req.query);

    res.status(200).json(services);
};

export const getServiceById = async (req, res) => {
    const service = await servicesService.getServiceById(req.params.sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
};

export const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const updateService = async (req, res) => {
    const service = await servicesService.updateService(
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

export const deleteService = async (req, res) => {
    const deletedService = await servicesService.deleteService(req.params.sid);

    if (!deletedService) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(deletedService);
};