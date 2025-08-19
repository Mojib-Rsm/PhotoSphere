"use server";

import { z } from "zod";
import { suggestAlbumDetails } from "@/ai/flows/suggest-album-details";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitFeedback(prevState: any, formData: FormData) {
  const validatedFields = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }
  
  console.log("Feedback received:", validatedFields.data);

  return {
    message: "Thank you for your feedback!",
    errors: {},
  };
}


const albumSchema = z.object({
    albumName: z.string().min(1, "Album name is required."),
    albumDescription: z.string().optional(),
    photoIds: z.array(z.string()).min(1, "Please select at least one photo."),
});

export async function createAlbumAction(prevState: any, formData: FormData) {
    const validatedFields = albumSchema.safeParse({
        albumName: formData.get("albumName"),
        albumDescription: formData.get("albumDescription"),
        photoIds: formData.getAll("photoIds"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please correct the errors.",
            data: null,
        }
    }

    console.log("Creating album:", validatedFields.data);

    return {
        message: "Album created successfully!",
        errors: {},
        data: validatedFields.data,
    }
}


const suggestDetailsSchema = z.object({
  photoDescriptions: z.array(z.string()),
});

export async function suggestAlbumDetailsAction(input: { photoDescriptions: string[] }) {
  const validatedInput = suggestDetailsSchema.safeParse(input);

  if (!validatedInput.success) {
    throw new Error("Invalid input for album detail suggestion.");
  }

  try {
    const result = await suggestAlbumDetails(validatedInput.data);
    return result;
  } catch (error) {
    console.error("Error suggesting album details:", error);
    return { albumName: "", albumDescription: "Could not generate suggestions." };
  }
}
