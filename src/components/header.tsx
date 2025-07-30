"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/models", label: "Models" },
  { href: "/photoshoot-hub", label: "AI Photoshoot" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg text-primary">
              eMM Muse
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild>
            <Link href="/model-match">
              <Sparkles className="mr-2 h-4 w-4" /> AI Model Match
            </Link>
          </Button>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="p-4">
                 <Link
                  href="/"
                  className="mb-8 flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-lg text-primary">
                    eMM Muse
                  </span>
                </Link>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center gap-y-6 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="p-4 mt-auto">
                <Button asChild className="w-full" size="lg" onClick={closeMenu}>
                  <Link href="/model-match">
                    <Sparkles className="mr-2 h-4 w-4" /> AI Model Match
                  </Link>
                </Button>
              </div>
            </div>
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
