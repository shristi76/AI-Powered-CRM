import { Router } from "express";
import { analyzeCSV } from "../controllers/ai.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/analyze", upload.single("file"), analyzeCSV);

export default router;