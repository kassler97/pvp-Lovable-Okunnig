import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import {
  products,
  categories,
  allSizes,
  allMaterials,
  allColors,
  Category,
  Size,
  Material,
  Color,
} from "@/data/products";
import { cn } from "@/lib/utils";

type Filter = "Alla" | Category;
type Sort = "default" | "low" | "high";

const Shop = () => {
  const [active, setActive] = useState<Filter>("Alla");
  const [sort, setSort] = useState<Sort>("default");
  const [sizes, setSizes] = useState<Size[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = active === "Alla" ? products : products.filter((p) => p.category === active);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (materials.length) list = list.filter((p) => p.materials.some((m) => materials.includes(m)));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sort, sizes, materials, colors]);

  const tabs: Filter[] = ["Alla", ...categories];

  // visible sizes depend on category
  const visibleSizes = useMemo(() => {
    const inCat = active === "Alla" ? products : products.filter((p) => p.category === active);
    const set = new Set<Size>();
    inCat.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return allSizes.filter((s) => set.has(s));
  }, [active]);

  const clearAll = () => {
    setSizes([]); setMaterials([]); setColors([]);
  };

  const Chip = ({ active: a, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
        a ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-card/30">
        <div className="container py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kollektion</p>
          <h1 className="mt-2 font-display text-6xl tracking-tight md:text-7xl">Shop</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Bläddra i alla våra plagg. Filtrera på kategori, storlek, material och färg.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {/* Category tabs */}
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

        {/* Attribute filters */}
        <div className="mt-6 grid gap-6 border-b border-border pb-6 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Storlek</p>
            <div className="flex flex-wrap gap-1.5">
              {visibleSizes.map((s) => (
                <Chip key={s} active={sizes.includes(s)} onClick={() => toggle(sizes, s, setSizes)}>{s}</Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Material</p>
            <div className="flex flex-wrap gap-1.5">
              {allMaterials.map((m) => (
                <Chip key={m} active={materials.includes(m)} onClick={() => toggle(materials, m, setMaterials)}>{m}</Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Färg</p>
            <div className="flex flex-wrap gap-1.5">
              {allColors.map((c) => (
                <Chip key={c} active={colors.includes(c)} onClick={() => toggle(colors, c, setColors)}>{c}</Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Count + clear */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {filtered.length} plagg
          </p>
          {(sizes.length + materials.length + colors.length) > 0 && (
            <button
              onClick={clearAll}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              Rensa filter
            </button>
          )}
        </div>

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
