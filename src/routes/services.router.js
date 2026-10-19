import express from "express";

import { validate } from "../middlewares/validate.js";

import {
    createServiceSchema,
    updateServiceSchema
} from "../validations/service.validation.js";

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";

const router = express.Router();

router.get("/", getServices);

router.get("/:sid", getServiceById);

router.post("/", validate(createServiceSchema), createService);

router.put("/:sid", validate(updateServiceSchema), updateService);

router.delete("/:sid", deleteService);

export default router;