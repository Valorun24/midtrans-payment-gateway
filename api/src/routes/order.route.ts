import express from "express";
import { createOrderController, midtransWebhook } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(createOrderController);
router.post("/midtrans/webhook", midtransWebhook);

export default router;
