import express from "express";
import { createOrderController } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(createOrderController);

export default router;
