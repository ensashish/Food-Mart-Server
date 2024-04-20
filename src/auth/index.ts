import express from "express";
import { adminLogin, login, register } from "./auth";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/adminlogin', adminLogin);

export default router;