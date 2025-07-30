import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-secondary py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <article className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
          <header className="mb-8 border-b pb-8">
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>
          </header>
          <div
            className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-primary hover:prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
