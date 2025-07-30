"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Lightbulb, VenetianMask, Warehouse, Shirt, Sparkles } from "lucide-react";
import { getPhotoshootIdea } from "./actions";
import type { GeneratePhotoshootIdeaOutput } from "@/ai/flows/generate-photoshoot-idea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  theme: z.string().min(3, {
    message: "Your theme must be at least 3 characters long.",
  }),
});

export default function PhotoshootHubPage() {
  const [idea, setIdea] = useState<GeneratePhotoshootIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setIdea(null);
    try {
      const result = await getPhotoshootIdea(data);
      setIdea(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate photoshoot idea. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Camera className="mx-auto h-12 w-12 text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          AI Photoshoot Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Spark your creativity. Enter a theme and let our AI generate a complete photoshoot concept with a visual inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Generate Concept</CardTitle>
              <CardDescription>Enter a theme to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photoshoot Theme</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'Urban Explorer' or 'Retro Future'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Generating..." : "Generate Idea"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-3xl font-headline font-bold text-primary mb-6">Generated Concept</h2>
          <div className="space-y-6">
            {isLoading && <SkeletonResult />}
            
            {!isLoading && idea && (
               <Card className="overflow-hidden">
                <CardContent className="p-0">
                   {idea.image.url && (
                    <Image
                      src={idea.image.url}
                      alt={idea.image.prompt}
                      data-ai-hint="fashion photoshoot"
                      width={800}
                      height={500}
                      className="object-cover w-full h-auto aspect-[4/3] bg-muted"
                    />
                  )}
                </CardContent>
                <CardHeader>
                    <CardTitle>Concept Details</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                  <InfoRow icon={VenetianMask} title="Mood & Art Direction" content={idea.concept.mood} />
                  <InfoRow icon={Warehouse} title="Location & Scenery" content={idea.concept.location} />
                  <InfoRow icon={Shirt} title="Styling & Wardrobe" content={idea.concept.styling} />
                  <InfoRow icon={Lightbulb} title="Props" content={idea.concept.props} />
                 </CardContent>
               </Card>
            )}

            {!isLoading && !idea && (
              <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
                <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-semibold">Your creative concept will appear here.</h3>
                <p className="text-muted-foreground">Fill out the form to get started.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
  <div>
    <h4 className="flex items-center font-semibold text-lg mb-2">
      <Icon className="h-5 w-5 mr-3 text-primary" />
      {title}
    </h4>
    <p className="text-muted-foreground pl-8">{content}</p>
  </div>
);

const SkeletonResult = () => (
  <Card>
    <Skeleton className="h-[300px] w-full" />
    <CardHeader>
      <Skeleton className="h-6 w-1/3 mb-4" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-full" />
      </div>
       <div className="space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </CardContent>
  </Card>
);
