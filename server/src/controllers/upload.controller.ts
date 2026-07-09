import { Request, Response } from "express";
import { CSVProcessingService } from "../services/csv/csv-processing.service";

export const uploadCSV = (
  req: Request,
  res: Response
): void => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
      return;
    }

    const result = CSVProcessingService.process(req.file.buffer);

    res.status(200).json({
      success: true,
      message: "CSV uploaded successfully.",
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    });
  }
};