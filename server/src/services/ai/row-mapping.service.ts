import { CSVRow } from "../../types/csv.types";

export class RowMappingService {
  static mapRows(
    rows: CSVRow[],
    mapping: Record<string, string | null>
  ) {
    return rows.map((row) => {
      const mappedRow: Record<string, any> = {};

      Object.entries(mapping).forEach(([csvColumn, crmField]) => {
        if (!crmField) return;

        mappedRow[crmField] = row[csvColumn] ?? null;
      });

      return mappedRow;
    });
  }
}