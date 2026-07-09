import Papa from "papaparse";
import { CSVRow } from "../../types/csv.types";

export class CSVService {
  static parse(buffer: Buffer): CSVRow[] {
    const csv = buffer.toString("utf8");

    const result = Papa.parse<CSVRow>(csv, {
      header: true,
      skipEmptyLines: true,
    });

    return result.data;
  }
}