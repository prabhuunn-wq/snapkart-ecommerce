import { Router } from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/", protect, adminOnly, createProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;