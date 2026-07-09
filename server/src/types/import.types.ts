export interface ImportSummary {
  totalRows: number;
  mappedColumns: number;
  unmappedColumns: number;
  mappedFields: string[];
  unmappedFields: string[];
}