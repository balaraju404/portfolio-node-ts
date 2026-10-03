import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

// API routes
router.use("/users", userRoutes);

export default router;