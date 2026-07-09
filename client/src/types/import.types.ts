export interface ImportSummary {
  totalRows: number;
  mappedColumns: number;
  unmappedColumns: number;
  mappedFields: string[];
  unmappedFields: string[];
}

export interface AnalyzeResponse {
  success: boolean;

  summary: ImportSummary;

  mapping: Record<string, string | null>;

  mappedRows: Record<string, any>[];
}