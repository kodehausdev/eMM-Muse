import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allModels } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send } from "lucide-react";

export async function generateStaticParams() {
  return allModels.map((model) => ({
    id: model.id.toString(),
  }));
}

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const model = allModels.find((m) => m.id.toString() === params.id);

  if (!model) {
    notFound();
  }

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/models">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Models
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <Image
                src={model.imageUrl}
                alt={`Profile of ${model.name}`}
                data-ai-hint="male model portrait"
                width={500}
                height={700}
                className="rounded-lg shadow-2xl object-cover w-full"
                priority
              />
              <div className="mt-6 bg-card p-6 rounded-lg shadow-lg">
                <h1 className="font-headline text-4xl font-bold text-primary">{model.name}</h1>
                <Separator className="my-4" />
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between"><span>Age:</span> <span className="font-semibold">{model.age}</span></div>
                  <div className="flex justify-between"><span>Height:</span> <span className="font-semibold">{model.height}</span></div>
                  <div className="flex justify-between"><span>Hair:</span> <span className="font-semibold">{model.hairColor}</span></div>
                  <div className="flex justify-between"><span>Body:</span> <span className="font-semibold">{model.bodyType}</span></div>
                  <div className="flex justify-between"><span>Location:</span> <span className="font-semibold">{model.location}</span></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{model.specialty}</Badge>
                  <Badge variant="secondary">{model.expertise}</Badge>
                </div>
                <Separator className="my-4" />
                <Button asChild size="lg" className="w-full">
                  <Link href={`/contact?model=${model.name}`}>
                    <Send className="mr-2 h-4 w-4" />
                    Book {model.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">Portfolio</h2>
            {model.portfolio && model.portfolio.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {model.portfolio.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg group">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      data-ai-hint={photo.hint}
                      width={800}
                      height={1200}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-card rounded-lg">
                <p className="text-muted-foreground">Portfolio coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
