'use server';
/**
 * @fileOverview An AI agent to generate photoshoot ideas.
 *
 * - generatePhotoshootIdea - A function that generates a photoshoot concept based on a theme.
 * - GeneratePhotoshootIdeaInput - The input type for the generatePhotoshootIdea function.
 * - GeneratePhotoshootIdeaOutput - The return type for the generatePhotoshootIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePhotoshootIdeaInputSchema = z.object({
  theme: z.string().describe('The theme or concept for the photoshoot.'),
});
export type GeneratePhotoshootIdeaInput = z.infer<
  typeof GeneratePhotoshootIdeaInputSchema
>;

const PhotoshootConceptSchema = z.object({
  mood: z.string().describe('The overall mood and art direction.'),
  location: z.string().describe('Suggestions for the location and scenery.'),
  styling: z.string().describe('Concepts for model styling and wardrobe.'),
  props: z.string().describe('Ideas for potential props to use.'),
});

const GeneratePhotoshootIdeaOutputSchema = z.object({
  concept: PhotoshootConceptSchema,
  image: z
    .object({
      url: z
        .string()
        .describe('The data URI of the generated visualization image.'),
      prompt: z.string().describe('The prompt used to generate the image.'),
    })
    .describe('A visualization of the photoshoot concept.'),
});
export type GeneratePhotoshootIdeaOutput = z.infer<
  typeof GeneratePhotoshootIdeaOutputSchema
>;

export async function generatePhotoshootIdea(
  input: GeneratePhotoshootIdeaInput
): Promise<GeneratePhotoshootIdeaOutput> {
  return generatePhotoshootIdeaFlow(input);
}

const ideaPrompt = ai.definePrompt({
  name: 'photoshootIdeaPrompt',
  input: {schema: GeneratePhotoshootIdeaInputSchema},
  output: {schema: PhotoshootConceptSchema},
  prompt: `You are an expert creative director for a high-fashion male modeling agency. A client has provided a theme and needs a full photoshoot concept.

Generate a creative and detailed photoshoot concept based on the following theme: "{{theme}}".

Provide distinct ideas for:
1.  **Mood & Art Direction**: What is the feeling and visual style?
2.  **Location & Scenery**: Where should this be shot? What does the background look like?
3.  **Styling & Wardrobe**: What should the model wear? Be specific about clothing types and styles.
4.  **Props**: What objects should be included in the scene?

Flesh out each of these sections with compelling, imaginative ideas.`,
});

const generatePhotoshootIdeaFlow = ai.defineFlow(
  {
    name: 'generatePhotoshootIdeaFlow',
    inputSchema: GeneratePhotoshootIdeaInputSchema,
    outputSchema: GeneratePhotoshootIdeaOutputSchema,
  },
  async (input: GeneratePhotoshootIdeaInput) => {
    // 1. Generate the textual concept
    const ideaResponse = await ideaPrompt(input);
    const concept = ideaResponse.output!;

    // 2. Create a prompt for image generation
    const imagePromptText = `A high-fashion, award-winning photograph of a male model. The theme is "${input.theme}". Mood: ${concept.mood}. Location: ${concept.location}. Styling: ${concept.styling}.`;

    // 3. Generate the image
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: imagePromptText,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('Image generation failed.');
    }

    return {
      concept: concept,
      image: {
        url: media.url,
        prompt: imagePromptText,
      },
    };
  }
);
