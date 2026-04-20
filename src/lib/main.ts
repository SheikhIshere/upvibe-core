import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "./supports/Prompt/main_prompt";
import { output_schema } from "./supports/output_schema";
import { FALLBACK_MODELS } from "./supports/engin_model";
import { ProposalResponse } from "./supports/Prompt/personal_words";
import { handleGenerationError } from "./supports/erros";

export type { ProposalResponse };

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateProposal(jobDescription: string): Promise<ProposalResponse> {
  let lastError: unknown;

  for (const model of FALLBACK_MODELS) {
    try {
      console.log(`[ENGINE] Attempting generation with model: ${model}`);

      const response = await ai.models.generateContent({
        model: model,
        contents: jobDescription,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: output_schema,
          temperature: 0.1, // Highly deterministic & analytical
        },
      });

      if (!response.text) {
        throw new Error(`Model ${model} returned an empty text payload.`);
      }

      try {
        const parsedData = JSON.parse(response.text) as ProposalResponse;
        console.log(`[ENGINE] Successfully generated artifact using: ${model}`);
        return parsedData;
      } catch (parseError) {
        throw new Error(`Failed to parse JSON response from ${model}.`);
      }

    } catch (error) {
      lastError = handleGenerationError(error, model);
      // Continue to next model in the chain
    }
  }

  // All models in the fallback chain failed
  console.error("[ENGINE] CRITICAL: All fallback models failed.");
  throw lastError || new Error("Generation sequence failed across all models.");
}