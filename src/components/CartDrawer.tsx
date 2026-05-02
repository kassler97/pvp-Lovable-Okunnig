import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/context/CartContext";

export const CartDrawer = () => {
  const { items, open, setOpen, removeItem, updateQuantity, subtotal, shipping, total } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl uppercase tracking-wider">Varukorg</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Din varukorg är tom.</p>
            <Button onClick={() => setOpen(false)} asChild>
              <Link to="/shop">Till shoppen</Link>
            </Button>
          </div>
        ) : (
          <>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="border border-border bg-card px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
                {remaining} kr kvar till fri frakt
              </p>
            )}

            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}`} className="flex gap-3 py-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 flex-shrink-0 object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.product.category}</p>
                          <h3 className="text-sm font-semibold">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground">Storlek: {item.size}</p>
                        </div>
                        <button
                          aria-label="Ta bort"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center border border-border">
                          <button
                            aria-label="Minska"
                            className="p-1.5 hover:bg-muted"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button
                            aria-label="Öka"
                            className="p-1.5 hover:bg-muted"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">{item.product.price * item.quantity} kr</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Delsumma</span><span>{subtotal} kr</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frakt</span><span>{shipping === 0 ? "Fri" : `${shipping} kr`}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold">
                  <span>Totalt</span><span>{total} kr</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-4 w-full font-semibold uppercase tracking-wider">
                <Link to="/checkout" onClick={() => setOpen(false)}>Till kassan</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
