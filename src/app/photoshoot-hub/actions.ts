"use server";

import { generatePhotoshootIdea, GeneratePhotoshootIdeaInput, GeneratePhotoshootIdeaOutput } from "@/ai/flows/generate-photoshoot-idea";
import { z } from "zod";

const GeneratePhotoshootIdeaInputSchema = z.object({
  theme: z.string().min(3, "Theme must be at least 3 characters long."),
});

export async function getPhotoshootIdea(input: GeneratePhotoshootIdeaInput): Promise<GeneratePhotoshootIdeaOutput> {
  const parsedInput = GeneratePhotoshootIdeaInputSchema.safeParse(input);

  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }

  try {
    const result = await generatePhotoshootIdea(parsedInput.data);
    return result;
  } catch (error) {
    console.error("Error fetching photoshoot idea:", error);
    throw new Error("Failed to get a photoshoot idea from the AI model.");
  }
}
