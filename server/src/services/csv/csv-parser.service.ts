import Papa, { ParseError } from "papaparse";
import { CSVRow, ParsedCSV } from "../../types/csv.types";

export class CSVParserService {
  static parse(buffer: Buffer): ParsedCSV {
    const csvString = buffer.toString("utf8").trim();

    if (!csvString) {
      throw new Error("Uploaded CSV file is empty.");
    }

    const result = Papa.parse<CSVRow>(csvString, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    const fatalErrors = result.errors.filter(
      (error: ParseError) =>
        error.type === "Delimiter" || error.code !== "UndetectableDelimiter"
    );

    if (fatalErrors.length > 0) {
      throw new Error(`CSV Parsing Error:`);
    }

    if (!result.data.length) {
      throw new Error("CSV contains no records.");
    }

    const firstRow = result.data[0]!;

    return {
      rows: result.data,
      headers: Object.keys(firstRow),
      totalRows: result.data.length,
    };
  }
}