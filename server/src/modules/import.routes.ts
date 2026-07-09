import { Router } from "express";
import { ImportController } from "./import.controller";

const router = Router();

router.post(
    "/",
    ImportController.import
);

export default router;