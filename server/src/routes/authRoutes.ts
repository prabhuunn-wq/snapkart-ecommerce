import { Router } from "express";
import { registerUser, loginUser, updateAddress, getProfile } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/address", protect, updateAddress);

export default router;