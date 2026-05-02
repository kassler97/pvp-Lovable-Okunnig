import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, Category } from "@/data/products";
import { cn } from "@/lib/utils";

type Filter = "Alla" | Category;
type Sort = "default" | "low" | "high";

const Shop = () => {
  const [active, setActive] = useState<Filter>("Alla");
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    let list = active === "Alla" ? products : products.filter((p) => p.category === active);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sort]);

  const tabs: Filter[] = ["Alla", ...categories];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-card/30">
        <div className="container py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kollektion</p>
          <h1 className="mt-2 font-display text-6xl tracking-tight md:text-7xl">Shop</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Bläddra i alla våra plagg. Filtrera på kategori eller sortera efter pris.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={cn(
                  "border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  active === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sortera
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="default">Standard</option>
              <option value="low">Pris: lågt → högt</option>
              <option value="high">Pris: högt → lågt</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "plagg" : "plagg"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">Inga plagg matchar ditt filter.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
