'use server';

/**
 * @fileOverview An AI agent that suggests album names and descriptions based on the photos in the album.
 *
 * - suggestAlbumDetails - A function that handles the album details suggestion process.
 * - SuggestAlbumDetailsInput - The input type for the suggestAlbumDetails function.
 * - SuggestAlbumDetailsOutput - The return type for the suggestAlbumDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlbumDetailsInputSchema = z.object({
  photoDescriptions: z.array(
    z.string().describe('A description of a photo in the album.')
  ).describe('An array of photo descriptions from the album.'),
});
export type SuggestAlbumDetailsInput = z.infer<typeof SuggestAlbumDetailsInputSchema>;

const SuggestAlbumDetailsOutputSchema = z.object({
  albumName: z.string().describe('A suggested name for the album.'),
  albumDescription: z.string().describe('A suggested description for the album.'),
});
export type SuggestAlbumDetailsOutput = z.infer<typeof SuggestAlbumDetailsOutputSchema>;

export async function suggestAlbumDetails(input: SuggestAlbumDetailsInput): Promise<SuggestAlbumDetailsOutput> {
  return suggestAlbumDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlbumDetailsPrompt',
  input: {schema: SuggestAlbumDetailsInputSchema},
  output: {schema: SuggestAlbumDetailsOutputSchema},
  prompt: `You are an expert at creating album names and descriptions.

  Based on the following photo descriptions, suggest a name and description for the album.

  Photo Descriptions:
  {{#each photoDescriptions}}
  - {{{this}}}
  {{/each}}

  Please provide a creative and concise album name and a compelling description.
  `,
});

const suggestAlbumDetailsFlow = ai.defineFlow(
  {
    name: 'suggestAlbumDetailsFlow',
    inputSchema: SuggestAlbumDetailsInputSchema,
    outputSchema: SuggestAlbumDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
