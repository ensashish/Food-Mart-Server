import express from "express";
import authRouter from './auth/index';
import adminRouter from './admin/index';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);

export default router;