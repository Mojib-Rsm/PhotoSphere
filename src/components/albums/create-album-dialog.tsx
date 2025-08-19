"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Photo } from "@/lib/data";
import { createAlbumAction, suggestAlbumDetailsAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, PlusCircle, Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  albumName: z.string().min(1, "Album name is required."),
  albumDescription: z.string().optional(),
  selectedPhotos: z.array(z.string()).min(1, "Please select at least one photo."),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateAlbumDialog({ allPhotos }: { allPhotos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isSuggesting, startSuggestionTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      albumName: "",
      albumDescription: "",
      selectedPhotos: [],
    },
  });

  const handleSuggest = () => {
    const selectedPhotoIds = form.getValues("selectedPhotos");
    const descriptions = allPhotos
      .filter((p) => selectedPhotoIds.includes(p.id))
      .map((p) => p.description);

    if (descriptions.length === 0) {
      toast({
        variant: "destructive",
        title: "No photos selected",
        description: "Please select some photos to get suggestions.",
      });
      return;
    }

    startSuggestionTransition(async () => {
      const suggestions = await suggestAlbumDetailsAction({ photoDescriptions: descriptions });
      if (suggestions) {
        form.setValue("albumName", suggestions.albumName, { shouldValidate: true });
        form.setValue("albumDescription", suggestions.albumDescription, { shouldValidate: true });
        toast({
          title: "Suggestions applied!",
          description: "Feel free to edit them as you like.",
        });
      }
    });
  };
  
  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("albumName", values.albumName);
    formData.append("albumDescription", values.albumDescription || "");
    values.selectedPhotos.forEach(id => formData.append("photoIds", id));
    
    const result = await createAlbumAction(null, formData);
    if(result.errors && Object.keys(result.errors).length > 0) {
        toast({ variant: "destructive", title: "Error", description: result.message });
    } else {
        toast({ title: "Success", description: result.message });
        setOpen(false);
        form.reset();
        setStep(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
            form.reset();
            setStep(1);
        }
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create New Album</DialogTitle>
              <DialogDescription>
                {step === 1 ? "Select photos to include in your new album." : "Add a name and description for your album."}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {step === 1 && (
                <ScrollArea className="h-96">
                    <FormField
                    control={form.control}
                    name="selectedPhotos"
                    render={() => (
                        <FormItem>
                        <div className="grid grid-cols-3 gap-2">
                            {allPhotos.map((photo) => (
                            <FormField
                                key={photo.id}
                                control={form.control}
                                name="selectedPhotos"
                                render={({ field }) => {
                                return (
                                    <FormItem key={photo.id} className="relative">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value?.includes(photo.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                            ? field.onChange([...field.value, photo.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== photo.id
                                                )
                                            )
                                        }}
                                        className="absolute top-2 right-2 z-10 h-5 w-5 bg-background/70"
                                        />
                                    </FormControl>
                                    <Image
                                        src={photo.url}
                                        alt={photo.description}
                                        width={200}
                                        height={200}
                                        data-ai-hint={photo.aiHint}
                                        className={`w-full h-full object-cover rounded-md transition-opacity ${field.value?.includes(photo.id) ? 'opacity-100' : 'opacity-70'}`}
                                    />
                                    </FormItem>
                                )
                                }}
                            />
                            ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </ScrollArea>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="albumName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Album Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Summer Vacation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="albumDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A short description of your album..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              {step === 1 && (
                <Button type="button" onClick={() => form.trigger("selectedPhotos").then(isValid => isValid && setStep(2))}>
                  Next
                </Button>
              )}
              {step === 2 && (
                <>
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" variant="outline" onClick={handleSuggest} disabled={isSuggesting}>
                    {isSuggesting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Suggest Details
                  </Button>
                  <Button type="submit">Create Album</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
