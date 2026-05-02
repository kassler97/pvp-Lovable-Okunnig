import { useState } from "react";
import { Product, Size } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: Product }) => {
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const { addItem } = useCart();

  const handleAdd = () => {
    if (!size) {
      toast.error("Välj en storlek");
      return;
    }
    addItem(product, size);
    toast.success(`${product.name} tillagd`);
  };

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-card">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            New
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 text-sm font-semibold">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.colors.join(" · ")}
          </p>
        </div>
        <p className="whitespace-nowrap text-sm font-semibold">{product.price} kr</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={cn(
              "border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors",
              size === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-3 w-full border border-foreground bg-foreground py-2 text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:border-primary hover:text-primary-foreground"
      >
        Lägg i varukorg
      </button>
    </article>
  );
};
