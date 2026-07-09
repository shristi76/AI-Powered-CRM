import { HeaderAnalysisService } from "../ai/header-analysis.service";
import { CSVParserService } from "./csv-parser.service";
import { CSVPreviewService } from "./csv-preview.service";
import { CSVValidatorService } from "./csv-validator.service";

export class CSVProcessingService {
  static process(buffer: Buffer) {
    // Parse CSV
    const parsedCSV = CSVParserService.parse(buffer);

    // Validate CSV
    CSVValidatorService.validate(parsedCSV.rows);

    // Analyze Headers
    const analysis = HeaderAnalysisService.analyze(parsedCSV);

    // Generate Preview
    const preview = CSVPreviewService.generate(parsedCSV);

    return {
      ...preview,
      analysis,
    };
  }
}