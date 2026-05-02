import { Product } from "@/data/products";

export const ProductCard = ({ product }: { product: Product }) => (
  <article className="group cursor-pointer">
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
      </div>
      <p className="text-sm font-semibold whitespace-nowrap">{product.price} kr</p>
    </div>
  </article>
);
