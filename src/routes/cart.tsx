import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatKES } from "@/data/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — Bomax Modern Furniture" }] }),
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-serif text-foreground">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse collections
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-[1fr_320px] gap-10">
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{formatKES(product.price)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => setQty(product.id, quantity - 1)} className="p-2 hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{quantity}</span>
                      <button onClick={() => setQty(product.id, quantity + 1)} className="p-2 hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive p-2"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="text-right font-medium text-foreground">{formatKES(product.price * quantity)}</div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl text-foreground">Order summary</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatKES(total)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-muted-foreground">Calculated at checkout</span>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex justify-between text-base">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-semibold text-foreground">{formatKES(total)}</span>
            </div>
            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Proceed to checkout
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">You'll be asked to sign in to complete your order.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
