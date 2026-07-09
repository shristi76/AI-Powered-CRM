export interface ImportRequest {
  mapping: Record<string, string | null>;
  rows: Record<string, any>[];
}

export interface ImportResponse {
  success: boolean;
  importedRows: number;
  failedRows: number;
  executionTime: string;
  message: string;
  crmPayload: Record<string, any>[];
}