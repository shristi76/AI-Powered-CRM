import { CSVRow } from "../../types/csv.types";

export class CSVValidatorService {
  static validate(rows: CSVRow[]): void {
    // 1. Check if any rows exist
    if (!rows || rows.length === 0) {
      throw new Error("CSV is empty.");
    }

    const firstRow = rows[0];

    // 2. Safety check
    if (!firstRow) {
      throw new Error("CSV contains no rows.");
    }

    const headers = Object.keys(firstRow);

    // 3. Check headers exist
    if (headers.length === 0) {
      throw new Error("CSV headers are missing.");
    }

    // 4. Check headers are not empty
    const hasEmptyHeader = headers.some(
      (header) => !header || header.trim() === ""
    );

    if (hasEmptyHeader) {
      throw new Error("CSV contains empty header names.");
    }

    // 5. Check if every row is completely empty
    const hasValidData = rows.some((row) =>
      Object.values(row).some(
        (value) => value !== null && value !== undefined && String(value).trim() !== ""
      )
    );

    if (!hasValidData) {
      throw new Error("CSV contains no valid data.");
    }
  }
}