import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { formatKES } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Bomax Modern Furniture" }] }),
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState<"mpesa" | "visa">("mpesa");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth", search: { redirect: "/checkout" } });
      } else {
        setAuthed(true);
      }
      setChecking(false);
    });
  }, [navigate]);

  if (checking) return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-muted-foreground">Loading…</div>;
  if (!authed) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-serif text-foreground">Your cart is empty</h1>
        <Link to="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Browse collections
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fulfillment === "delivery" && !location.trim()) {
      toast.error("Please enter your delivery location");
      return;
    }
    setSubmitting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;
      if (!userId) throw new Error("Not signed in");

      const { error } = await supabase.from("orders").insert({
        user_id: userId,
        customer_name: name.trim(),
        phone: phone.trim(),
        fulfillment,
        delivery_location: fulfillment === "delivery" ? location.trim() : null,
        payment_method: payment,
        items: items.map((i) => ({
          id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity,
        })),
        total,
      });
      if (error) throw error;

      toast.success("Order placed! We'll be in touch shortly.");
      clear();
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-serif text-foreground">Checkout</h1>

      <div className="mt-10 grid md:grid-cols-[1fr_340px] gap-10">
        <form onSubmit={submit} className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone number</label>
            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <span className="block text-sm font-medium text-foreground mb-2">Fulfillment</span>
            <div className="grid grid-cols-2 gap-3">
              {(["pickup", "delivery"] as const).map((opt) => (
                <label key={opt} className={`cursor-pointer rounded-md border p-4 text-sm capitalize ${fulfillment === opt ? "border-primary bg-secondary" : "border-border"}`}>
                  <input type="radio" name="fulfillment" className="sr-only" checked={fulfillment === opt} onChange={() => setFulfillment(opt)} />
                  <div className="font-medium text-foreground">{opt === "pickup" ? "Pickup" : "Delivery"}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{opt === "pickup" ? "Collect at Pipeline, Embakasi" : "We deliver to your location"}</div>
                </label>
              ))}
            </div>
          </div>
          {fulfillment === "delivery" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Delivery location</label>
              <input required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Estate, street, landmark"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          )}
          <div>
            <span className="block text-sm font-medium text-foreground mb-2">Payment method</span>
            <div className="grid grid-cols-2 gap-3">
              {(["mpesa", "visa"] as const).map((opt) => (
                <label key={opt} className={`cursor-pointer rounded-md border p-4 text-sm ${payment === opt ? "border-primary bg-secondary" : "border-border"}`}>
                  <input type="radio" name="payment" className="sr-only" checked={payment === opt} onChange={() => setPayment(opt)} />
                  <div className="font-medium text-foreground">{opt === "mpesa" ? "M-Pesa" : "Visa Card"}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{opt === "mpesa" ? "Pay via STK push" : "Debit / credit card"}</div>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={submitting}
            className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {submitting ? "Placing order…" : `Place order · ${formatKES(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between text-sm">
                <span className="text-foreground">{product.name} <span className="text-muted-foreground">× {quantity}</span></span>
                <span className="text-foreground">{formatKES(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t border-border" />
          <div className="flex justify-between text-base font-medium">
            <span>Total</span><span>{formatKES(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
