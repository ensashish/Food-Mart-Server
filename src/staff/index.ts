import express from "express";
import { addStaff, getAllStaff } from "./controller";

const router = express.Router();

router.post('/addStaff', addStaff);
router.post('/getAllStaff', getAllStaff);
export default router;