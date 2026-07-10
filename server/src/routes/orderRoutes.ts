import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  cancelOrder,
  getAssignedOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { protect, deliveryOnly } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/cancel", protect, cancelOrder);
router.get("/assigned", protect, deliveryOnly, getAssignedOrders);
router.put("/:id/status", protect, deliveryOnly, updateOrderStatus);

export default router;