export class ResponseValidatorService {
  static parse(rawResponse: string): Record<string, string | null> {
    // Remove markdown if present
    const cleaned = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: Record<string, string | null>;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }

    return parsed;
  }
}