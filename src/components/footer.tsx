import Link from "next/link";
import { Sparkles, Twitter, Instagram, Facebook, Camera } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl text-primary">
                eMM Muse
              </span>
            </Link>
            <p className="max-w-md text-muted-foreground">
              ecHe Male Models International is a premier agency representing the world&apos;s leading male talent.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li><Link href="/models" className="hover:text-primary transition-colors">Models</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/model-match" className="hover:text-primary transition-colors">AI Match</Link></li>
              <li><Link href="/photoshoot-hub" className="hover:text-primary transition-colors">AI Photoshoot Hub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {year} eMM Muse. All rights reserved. A division of ecHe Male Models International.</p>
        </div>
      </div>
    </footer>
  );
}
