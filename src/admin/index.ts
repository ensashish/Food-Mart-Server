import express from "express";
import staffRouter from '../staff/index';
import { verifyAdmin, verifyToken } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/staff', staffRouter);

export default router;