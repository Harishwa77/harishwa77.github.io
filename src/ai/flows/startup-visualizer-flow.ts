
'use server';
/**
 * @fileOverview A Genkit flow that generates a visual concept for a startup idea using Imagen 4.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StartupVisualizerInputSchema = z.object({
  idea: z.string().describe('The startup idea or concept description.'),
  industry: z.string().describe('The industry for visual context.'),
});
export type StartupVisualizerInput = z.infer<typeof StartupVisualizerInputSchema>;

const StartupVisualizerOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type StartupVisualizerOutput = z.infer<typeof StartupVisualizerOutputSchema>;

export async function generateStartupVisual(input: StartupVisualizerInput): Promise<StartupVisualizerOutput> {
  return startupVisualizerFlow(input);
}

const startupVisualizerFlow = ai.defineFlow(
  {
    name: 'startupVisualizerFlow',
    inputSchema: StartupVisualizerInputSchema,
    outputSchema: StartupVisualizerOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A professional, cinematic concept illustration for a startup in the ${input.industry} industry. 
      The startup concept is: ${input.idea}. 
      Style: Futuristic, sleek, high-end commercial photography, shallow depth of field, 8k resolution. 
      No text or logos.`,
    });

    if (!media) {
      throw new Error('Failed to generate startup concept art.');
    }

    return { imageUrl: media.url };
  }
);
