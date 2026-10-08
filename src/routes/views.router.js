import express from "express";
import {
    getServicesView,
    getAvailabilityView
} from "../controllers/views.controller.js";

const router = express.Router();

router.get("/services", getServicesView);

router.get("/availability", getAvailabilityView);

export default router;