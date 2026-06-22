import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { Award, Truck, ShieldCheck, Hammer } from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <p className="text-sm uppercase tracking-[0.25em] text-accent-foreground/80">Bomax · Pipeline, Embakasi</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-serif text-foreground max-w-3xl leading-[1.05]">
            Modern furniture, crafted for everyday living.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Coffee tables, TV stands, closets and shoe racks — built with care in Nairobi and delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#collections" className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Shop Collections
            </a>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Why Choose Us</p>
            <h2 className="mt-3 text-4xl font-serif text-foreground">Built better, by people who care.</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Hammer, title: "Locally crafted", desc: "Made in our Pipeline workshop by skilled Kenyan artisans." },
              { icon: Award, title: "Quality materials", desc: "Solid panels and durable finishes built to last." },
              { icon: Truck, title: "Pickup or delivery", desc: "Collect in-store or have it delivered across Nairobi." },
              { icon: ShieldCheck, title: "Secure payments", desc: "Pay easily via M-Pesa or Visa card at checkout." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <Icon className="h-8 w-8 text-accent-foreground" />
                <h3 className="mt-4 text-xl font-serif text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Our Collections</p>
            <h2 className="mt-3 text-4xl font-serif text-foreground">Explore the product lines</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Tap a collection to see every piece available.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group block overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-serif text-foreground">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                <span className="mt-4 inline-block text-sm font-medium text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-foreground">
                  Shop {c.name.toLowerCase()} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-8 -mt-8">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-serif">Visit our workshop in Pipeline, Embakasi.</h2>
          <p className="mt-3 opacity-90">Call us on 0757 854 534 to place an order or schedule a viewing.</p>
        </div>
      </section>
    </div>
  );
}
