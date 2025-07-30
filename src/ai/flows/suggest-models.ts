// This file holds the Genkit flow for suggesting models based on specified characteristics.

'use server';

/**
 * @fileOverview An AI agent to suggest suitable models based on specified characteristics.
 *
 * - suggestModels - A function that suggests models based on input characteristics.
 * - SuggestModelsInput - The input type for the suggestModels function.
 * - SuggestModelsOutput - The return type for the suggestModels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestModelsInputSchema = z.object({
  age: z.number().describe('The age of the model.'),
  hairColor: z.string().describe('The hair color of the model.'),
  bodyType: z.string().describe('The body type of the model.'),
  expertise: z.string().describe('The expertise of the model.'),
});
export type SuggestModelsInput = z.infer<typeof SuggestModelsInputSchema>;

const SuggestModelsOutputSchema = z.object({
  modelSuggestions: z.array(
    z.object({
      name: z.string().describe('The name of the suggested model.'),
      profileLink: z.string().describe('The link to the model profile.'),
      reason: z.string().describe('Why this model was suggested.'),
    })
  ).describe('A list of suggested models and why they are suitable.'),
});
export type SuggestModelsOutput = z.infer<typeof SuggestModelsOutputSchema>;

export async function suggestModels(input: SuggestModelsInput): Promise<SuggestModelsOutput> {
  return suggestModelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestModelsPrompt',
  input: {schema: SuggestModelsInputSchema},
  output: {schema: SuggestModelsOutputSchema},
  prompt: `You are an AI assistant for a male model agency.

You will suggest suitable models from the agency's portfolio based on the following characteristics:

Age: {{{age}}}
Hair Color: {{{hairColor}}}
Body Type: {{{bodyType}}}
Expertise: {{{expertise}}}

Suggest models that closely match the specified characteristics. Provide a reason for each suggestion.

Output in the following JSON format:
{{$instructions}}`,
});

const suggestModelsFlow = ai.defineFlow(
  {
    name: 'suggestModelsFlow',
    inputSchema: SuggestModelsInputSchema,
    outputSchema: SuggestModelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
