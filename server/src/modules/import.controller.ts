import { Request, Response } from "express";
import { ImportService } from "./import.service";

export class ImportController {
  static import(req: Request, res: Response) {
    try {
      console.log("========== IMPORT REQUEST ==========");
      console.log(req.body);

      const { rows } = req.body;

      console.log("Rows:", rows);

      const result = ImportService.importLeads(rows);

      console.log("Result:", result);

      return res.json(result);
    } catch (error) {
      console.error("IMPORT ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}