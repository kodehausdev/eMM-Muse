import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { featuredModels, blogPosts } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <Image
          src="/images/hero-background.jpg"
          alt="Male model fashion shoot"
          data-ai-hint="male model fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
            eMM Muse
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
            Defining the new era of male modeling. Discover unparalleled talent with ecHe Male Models International.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/model-match">
                <Sparkles className="mr-2" /> Find Your Muse with AI
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary">
              <Link href="/models">
                Explore Portfolios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Models */}
      <section id="featured" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-primary">
            Featured Muses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredModels.map((model) => (
              <Card key={model.id} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-0">
                  <Image
                    src={model.imageUrl}
                    alt={model.name}
                    width={400}
                    height={500}
                    className="object-cover w-full h-96 transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="male model portrait"
                  />
                </CardContent>
                <CardFooter className="p-4 bg-card">
                  <div>
                    <p className="font-bold text-lg font-headline">{model.name}</p>
                    <p className="text-sm text-muted-foreground">{model.specialty}</p>
                  </div>
                  <Link href={`/models/${model.id}`} className="ml-auto">
                    <Button variant="ghost" size="icon">
                      <ArrowRight />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/models">View All Models</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-primary">
            From the Journal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.slug} className="group flex flex-col">
                <CardHeader>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
