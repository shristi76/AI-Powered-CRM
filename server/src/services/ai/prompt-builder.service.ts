import { PromptContext, PromptResult } from "../../types/prompt.types";

export class PromptBuilderService {
  static build(context: PromptContext): PromptResult {
    const systemPrompt = `
You are an expert CRM Data Mapping Assistant.

Your job is to intelligently map uploaded CSV columns to the GrowEasy CRM schema.

You must:
- Understand different column names.
- Use sample values to infer meaning.
- Use detected data types.
- Return ONLY valid JSON.
- Never explain your answer.
- Never use markdown.
- Never wrap JSON inside \`\`\`json.
`;

    const crmFields = context.crmFields
      .map((field) => `- ${field}`)
      .join("\n");

    const uploadedColumns = context.headerAnalysis
      .map(
        (header) => `
Column Name : ${header.originalHeader}
Sample Value: ${header.sampleValue}
Detected Type: ${header.inferredType}
`
      )
      .join("\n");

    const userPrompt = `
You are given an uploaded CSV file.

Your task is to map EACH uploaded CSV column to ONE matching GrowEasy CRM field.

=========================
AVAILABLE CRM FIELDS
=========================

${crmFields}

=========================
UPLOADED CSV COLUMNS
=========================

${uploadedColumns}

=========================
RULES
=========================

1. JSON keys MUST be the uploaded CSV column names.
2. JSON values MUST be ONE of the CRM fields.
3. Use the sample value and detected type to understand the column.
4. If no suitable CRM field exists, use null.
5. Return ONLY JSON.
6. Do NOT explain.
7. Do NOT add markdown.
8. Do NOT return any text before or after JSON.

=========================
EXAMPLE
=========================

Uploaded CSV Columns

Column Name : Full Name
Sample Value: Rahul Sharma
Detected Type: text

Column Name : Mobile No
Sample Value: 9876543210
Detected Type: phone

Column Name : Email ID
Sample Value: rahul@gmail.com
Detected Type: email

Expected Output

{
  "Full Name": "name",
  "Mobile No": "mobile_without_country_code",
  "Email ID": "email"
}

=========================
NOW MAP THE ACTUAL CSV
=========================

Return ONLY JSON.
`;

    return {
      systemPrompt,
      userPrompt,
    };
  }
}