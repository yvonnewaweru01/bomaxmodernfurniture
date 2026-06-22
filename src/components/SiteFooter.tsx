import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-serif text-foreground">Bomax Modern Furniture</h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Quality, modern furniture crafted in Nairobi. Built for everyday living, designed to last.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href="tel:+254757854534" className="hover:text-foreground">0757 854 534</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href="mailto:ombasanyakundiboaz@gmail.com" className="hover:text-foreground break-all">ombasanyakundiboaz@gmail.com</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Pipeline, Embakasi, Nairobi</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Follow</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="https://instagram.com/bomax_modern_furniture" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <Instagram className="h-4 w-4" /> @bomax_modern_furniture
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@bomax.modern.furniture" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19.6 6.3a5.6 5.6 0 0 1-3.4-1.2V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a5.6 5.6 0 0 0 3.4 4.3v0z"/></svg>
                @bomax.modern.furniture
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bomax Modern Furniture. All rights reserved.
      </div>
    </footer>
  );
}
