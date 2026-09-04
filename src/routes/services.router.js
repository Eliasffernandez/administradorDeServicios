
import express from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = express.Router();

const serviceManager = new ServiceManager();

router.get("/", (req, res) => {
    let services = serviceManager.getServices();

    const { category, available } = req.query;

    if (category) {
        services = services.filter(
            service => service.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (available !== undefined) {
        services = services.filter(
            service => service.available === (available === "true")
        );
    }

    res.status(200).json(services);
});

router.get("/:sid", (req, res) => {
    const service = serviceManager.getServiceById(req.params.sid);

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
});

router.post("/", (req, res) => {
    try {
        const newService = serviceManager.addService(req.body);

        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.put("/:sid", (req, res) => {
    const service = serviceManager.updateService(
        req.params.sid,
        req.body
    );

    if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(service);
});

router.delete("/:sid", (req, res) => {
    const deletedService = serviceManager.deleteService(req.params.sid);

    if (!deletedService) {
        return res.status(404).json({
            error: "Servicio no encontrado"
        });
    }

    res.status(200).json(deletedService);
});

export default router;

