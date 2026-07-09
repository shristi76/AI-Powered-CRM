import { ImportSummary } from "../../types/import.types";

export class ImportSummaryService {
  static generate(
    totalRows: number,
    mapping: Record<string, string | null>
  ): ImportSummary {
    const mappedFields: string[] = [];
    const unmappedFields: string[] = [];

    Object.entries(mapping).forEach(([csvColumn, crmField]) => {
      if (crmField) {
        mappedFields.push(crmField);
      } else {
        unmappedFields.push(csvColumn);
      }
    });

    return {
      totalRows,
      mappedColumns: mappedFields.length,
      unmappedColumns: unmappedFields.length,
      mappedFields,
      unmappedFields,
    };
  }
}