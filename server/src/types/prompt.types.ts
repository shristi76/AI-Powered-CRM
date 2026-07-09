import { HeaderAnalysis } from "./header.types";

export interface PromptContext {
  crmFields: readonly string[];
  headerAnalysis: HeaderAnalysis[];
}

export interface PromptResult {
  systemPrompt: string;
  userPrompt: string;
}