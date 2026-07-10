import { Request, Response } from "express";
import { CRM_SCHEMA } from "../constants/crm-schema";
import { HeaderAnalysisService } from "../services/ai/header-analysis.service";
import { PromptBuilderService } from "../services/ai/prompt-builder.service";
import { GeminiService } from "../services/ai/gemini.service";
import { CSVParserService } from "../services/csv/csv-parser.service";
import { ResponseValidatorService } from "../services/ai/response-validator.service";
import { RowMappingService } from "../services/ai/row-mapping.service";
import { ImportSummaryService } from "../services/ai/import-summary.service";
import { CSVValidatorService } from "../services/csv/csv-validator.service";


export const analyzeCSV = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
    }

    const parsedCSV = CSVParserService.parse(req.file.buffer);
    CSVValidatorService.validate(parsedCSV.rows);

    const analysis =
      HeaderAnalysisService.analyze(parsedCSV);

    const prompt =
      PromptBuilderService.build({
        crmFields: CRM_SCHEMA,
        headerAnalysis: analysis,
      });

    // const response =
    //   await GeminiService.generate(prompt);

    // return res.json({
    //   success: true,
    //   aiResponse: response,
    // });
    const response = await GeminiService.generate(prompt);

const mapping = ResponseValidatorService.parse(response);

const mappedRows = RowMappingService.mapRows(
    parsedCSV.rows,
    mapping
);

const summary = ImportSummaryService.generate(
  parsedCSV.rows.length,
  mapping
);

// return res.json({
//     success: true,
//     mapping,
// });
return res.json({
  success: true,
  summary,
  mapping,
  mappedRows,
});

  }catch (error) {
  console.error(error);

  if (error instanceof Error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

