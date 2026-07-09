import { CSVRow } from "../../types/csv.types";

export class CSVValidatorService {
  static validate(rows: CSVRow[]) {
    if (!rows.length) {
      throw new Error("CSV contains no data.");
    }

    // const headers = Object.keys(rows[0]);
    const firstRow = rows[0];

if (!firstRow) {
    throw new Error("CSV contains no rows.");
}

const headers = Object.keys(firstRow);

    if (!headers.length) {
      throw new Error("CSV headers are missing.");
    }

    return true;
  }
}