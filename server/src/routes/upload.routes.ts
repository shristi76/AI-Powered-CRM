import { Router } from "express";
import { uploadCSV } from "../controllers/upload.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/", upload.single("file"), uploadCSV);

export default router;