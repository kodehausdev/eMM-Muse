"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Sparkles, User, Link as LinkIcon, AlertCircle } from "lucide-react";
import { getModelSuggestions } from "./actions";
import type { SuggestModelsInput, SuggestModelsOutput } from "@/ai/flows/suggest-models";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18.").max(50, "Age must be 50 or less."),
  hairColor: z.string().min(1, "Hair color is required."),
  bodyType: z.string().min(1, "Body type is required."),
  expertise: z.string().min(1, "Expertise is required."),
});

export default function ModelMatchPage() {
  const [suggestions, setSuggestions] = useState<SuggestModelsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SuggestModelsInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 25,
      hairColor: "Brown",
      bodyType: "Athletic",
      expertise: "Editorial",
    },
  });

  const onSubmit = async (data: SuggestModelsInput) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getModelSuggestions(data);
      setSuggestions(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          AI Model Match
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your ideal model. Our AI will analyze your requirements and suggest the perfect talent from our roster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Find Your Muse</CardTitle>
              <CardDescription>Fill in the details below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hairColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hair Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Blonde">Blonde</SelectItem>
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="Red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bodyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Athletic">Athletic</SelectItem>
                            <SelectItem value="Lean">Lean</SelectItem>
                            <SelectItem value="Slim">Slim</SelectItem>
                            <SelectItem value="Muscular">Muscular</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expertise</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Runway">Runway</SelectItem>
                            <SelectItem value="Editorial">Editorial</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Fitness">Fitness</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Analyzing..." : "Get Suggestions"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-3xl font-headline font-bold text-primary mb-6">Suggestions</h2>
          <div className="space-y-4">
            {isLoading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {!isLoading && suggestions && suggestions.modelSuggestions.length > 0 && (
              suggestions.modelSuggestions.map((suggestion, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="text-primary"/>
                      {suggestion.name}
                    </CardTitle>
                    <CardDescription>{suggestion.reason}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Button asChild variant="link" className="p-0">
                        <a href={suggestion.profileLink} target="_blank" rel="noopener noreferrer">
                          View Profile <LinkIcon className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}

            {!isLoading && suggestions && suggestions.modelSuggestions.length === 0 && (
              <Card className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No direct matches found.</h3>
                <p className="text-muted-foreground">Try adjusting your criteria for more results.</p>
              </Card>
            )}
             {!isLoading && !suggestions && (
              <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
                <Sparkles className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-semibold">Your model suggestions will appear here.</h3>
                <p className="text-muted-foreground">Fill out the form to get started.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-2/3 mt-1" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-5 w-24" />
    </CardContent>
  </Card>
);
