import "dotenv/config";

import express, { type Application } from "express";

import orderRoutes from "./routes/order.route.js";

const app: Application = express();

app.use(express.json());

app.get("/api/status", (req, res) => {
  res.status(200).json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/orders", orderRoutes);

const PORT: number = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
