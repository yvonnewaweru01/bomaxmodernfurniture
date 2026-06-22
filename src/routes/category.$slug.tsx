import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { getCategory, getProductsByCategory, formatKES, type CategorySlug, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  loader: ({ params }) => {
    const cat = getCategory(params.slug as CategorySlug);
    if (!cat) throw notFound();
    return { cat, products: getProductsByCategory(params.slug as CategorySlug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Collection"} — Bomax Modern Furniture` },
      { name: "description", content: loaderData?.cat.tagline ?? "Shop modern furniture at Bomax." },
    ],
  }),
});

function CategoryPage() {
  const { cat, products } = Route.useLoaderData();
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
      <div className="mt-6 mb-12">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Collection</p>
        <h1 className="mt-2 text-5xl font-serif text-foreground">{cat.name}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{cat.tagline}</p>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">No pieces available right now. Check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p: Product) => (
            <article key={p.id} className="group rounded-xl overflow-hidden border border-border bg-card">
              <div className="aspect-square overflow-hidden bg-secondary">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">{formatKES(p.price)}</span>
                  <button
                    onClick={() => { add(p); toast.success(`${p.name} added to cart`); }}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Add to cart
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Pay via M-Pesa or Visa · Pickup or delivery</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
