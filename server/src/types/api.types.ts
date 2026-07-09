import { CRMLead } from "./crm.types";

export interface ImportResponse {
  success: boolean;

  imported: number;

  skipped: number;

  records: CRMLead[];

  skippedRecords?: unknown[];
}