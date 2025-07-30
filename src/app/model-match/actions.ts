"use server";

import { suggestModels, SuggestModelsInput, SuggestModelsOutput } from "@/ai/flows/suggest-models";
import { z } from "zod";

const SuggestModelsInputSchema = z.object({
  age: z.number(),
  hairColor: z.string(),
  bodyType: z.string(),
  expertise: z.string(),
});

export async function getModelSuggestions(input: SuggestModelsInput): Promise<SuggestModelsOutput> {
  const parsedInput = SuggestModelsInputSchema.safeParse(input);

  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }

  try {
    const result = await suggestModels(parsedInput.data);
    
    // Create dummy profile links for the demo
    const suggestionsWithLinks = result.modelSuggestions.map(suggestion => ({
      ...suggestion,
      profileLink: `/models`, 
    }));

    return { modelSuggestions: suggestionsWithLinks };

  } catch (error) {
    console.error("Error fetching model suggestions:", error);
    throw new Error("Failed to get suggestions from the AI model.");
  }
}
