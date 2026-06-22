import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Bomax Modern Furniture" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <a href="/#collections" className="hover:text-foreground">Collections</a>
        </nav>
        <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">
          <ShoppingBag className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-[11px] flex items-center justify-center px-1">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
