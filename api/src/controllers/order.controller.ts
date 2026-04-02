import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { snap } from "../lib/midtrans.js";

export async function createOrderController(req: Request, res: Response) {
  const { customerId, propertyId, quantity } = req.body;

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  const order = await prisma.order.create({
    data: {
      customerId,
      propertyId,
      quantity,
      amount: Number(property.price) * quantity,
    },
    include: { Customer: true, Property: true },
  });

  const parameter = {
    transaction_details: {
      order_id: String(order.id),
      gross_amount: Math.round(Number(property.price) * quantity),
    },
    customer_details: {
      user_id: String(customerId),
    },
  };

  const snapResponse = await snap.createTransaction(parameter);

  console.log(snapResponse);

  res.status(200).json({
    message: "Order created",
    snapToken: snapResponse.token,
    redirectUrl: snapResponse.redirect_url,
  });
}
