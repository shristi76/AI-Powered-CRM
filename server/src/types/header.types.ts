export interface HeaderAnalysis {
  originalHeader: string;
  sampleValue: string;
  inferredType: "text" | "email" | "phone" | "number" | "date" | "unknown";
}