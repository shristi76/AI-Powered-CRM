import { ParsedCSV } from "../../types/csv.types";
import { HeaderAnalysis } from "../../types/header.types";

export class HeaderAnalysisService {
  static analyze(parsedCSV: ParsedCSV): HeaderAnalysis[] {
    return parsedCSV.headers.map((header) => {
      const sampleValue =
        String(parsedCSV.rows[0]?.[header] ?? "").trim();

      return {
        originalHeader: header,
        sampleValue,
        inferredType: this.detectType(sampleValue),
      };
    });
  }

  private static detectType(value: string): HeaderAnalysis["inferredType"] {
    if (!value) return "unknown";

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "email";
    }

    if (/^\+?\d{10,15}$/.test(value.replace(/\s/g, ""))) {
      return "phone";
    }

    if (!isNaN(Number(value))) {
      return "number";
    }

    if (!isNaN(Date.parse(value))) {
      return "date";
    }

    return "text";
  }
}