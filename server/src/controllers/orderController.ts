import { Request, Response } from "express";
import Order from "../models/Order";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: "No order items" });
      return;
    }

    if (!paymentMethod || !["Online", "COD"].includes(paymentMethod)) {
      res.status(400).json({ message: "Invalid payment method" });
      return;
    }

    const deliveryPartners = await User.find({ role: "delivery" });
    let assignedPartner = null;
    if (deliveryPartners.length > 0) {
      const randomIndex = Math.floor(Math.random() * deliveryPartners.length);
      assignedPartner = deliveryPartners[randomIndex]!._id;
    }

    const order = await Order.create({
      user: req.user?.id,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      isPaid: paymentMethod === "Online",
      deliveryPartner: assignedPartner,
    } as any);

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not create order" });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?.id } as any).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not fetch orders" });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (order.user.toString() !== req.user?.id) {
      res.status(403).json({ message: "Not authorized to cancel this order" });
      return;
    }

    if (order.status !== "Processing") {
      res.status(400).json({
        message: `Cannot cancel order with status: ${order.status}`,
      });
      return;
    }

    order.status = "Cancelled";
    await order.save({ validateModifiedOnly: true });

    res.json(order);
  } catch (error: any) {
    console.error("CANCEL ORDER ERROR:", error);
    res.status(500).json({ message: "Server error, could not cancel order" });
  }
};

export const getAssignedOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user?.id,
    } as any).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server error, could not fetch assigned orders" });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (order.deliveryPartner?.toString() !== req.user?.id) {
      res.status(403).json({ message: "Not authorized to update this order" });
      return;
    }

    const { status } = req.body;
    if (!["Shipped", "Delivered"].includes(status)) {
      res.status(400).json({ message: "Invalid status update" });
      return;
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: "Server error, could not update order" });
  }
};
