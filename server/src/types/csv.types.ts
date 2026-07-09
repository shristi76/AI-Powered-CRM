export interface CSVRow {
  [column: string]: string;
}

export interface ParsedCSV {
  rows: CSVRow[];
  headers: string[];
  totalRows: number;
}