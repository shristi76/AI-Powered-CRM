import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";

import testRoutes from "./routes/test.routes";
import aiRoutes from "./routes/ai.routes";
import importRoutes from "./modules/import.routes";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy 🚀",
  });
});


app.use("/api/upload", uploadRoutes);
app.use("/api/test", testRoutes); //dumming testing without ai
app.use("/api/ai", aiRoutes);
app.use(
    "/api/import",
    importRoutes
);

export default app;