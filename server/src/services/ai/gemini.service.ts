import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env";
import { PromptResult } from "../../types/prompt.types";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export class GeminiService {
  private static model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  static async generate(prompt: PromptResult): Promise<string> {
    const result = await this.model.generateContent([
      prompt.systemPrompt,
      prompt.userPrompt,
    ]);

    return result.response.text();
  }
}