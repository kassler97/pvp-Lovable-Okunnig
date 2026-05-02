import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart, SHIPPING_OPTIONS, FREE_SHIPPING_THRESHOLD, ShippingMethod } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PaymentMethod = "klarna" | "swish" | "card";

const PAYMENTS: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: "klarna", label: "Klarna", desc: "Faktura eller delbetalning" },
  { id: "swish", label: "Swish", desc: "Snabb betalning med mobilen" },
  { id: "card", label: "Bankkort", desc: "Visa, Mastercard" },
];

const Checkout = () => {
  const { items, subtotal, shipping, total, shippingMethod, setShippingMethod, clear } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("klarna");

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tack! Din order är mottagen.");
    clear();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="container py-24 text-center">
          <h1 className="font-display text-5xl tracking-tight">Kassan</h1>
          <p className="mt-4 text-muted-foreground">Din varukorg är tom.</p>
          <Button asChild className="mt-8">
            <Link to="/shop">Till shoppen</Link>
          </Button>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="container py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Steg 3 av 3</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">Kassan</h1>

        <form onSubmit={handlePlaceOrder} className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-10">
            {/* Adress */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider">Leveransadress</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Förnamn" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                <input required placeholder="Efternamn" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                <input required type="email" placeholder="E-post" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none sm:col-span-2" />
                <input required placeholder="Adress" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none sm:col-span-2" />
                <input required placeholder="Postnummer" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                <input required placeholder="Stad" className="border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
              </div>
            </div>

            {/* Frakt */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider">Leverans</h2>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Lägg till {remaining} kr för fri frakt
                </p>
              )}
              <div className="mt-4 space-y-2">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between border p-4 transition-colors",
                        shippingMethod === opt.id ? "border-primary bg-card" : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={shippingMethod === opt.id}
                          onChange={() => setShippingMethod(opt.id as ShippingMethod)}
                          className="accent-primary"
                        />
                        <div>
                          <p className="text-sm font-semibold">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.eta}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">{isFree ? "Fri" : `${opt.price} kr`}</p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Betalning */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider">Betalning</h2>
              <div className="mt-4 space-y-2">
                {PAYMENTS.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between border p-4 transition-colors",
                      payment === p.id ? "border-primary bg-card" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={p.id}
                        checked={payment === p.id}
                        onChange={() => setPayment(p.id)}
                        className="accent-primary"
                      />
                      <div>
                        <p className="text-sm font-semibold">{p.label}</p>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sammanfattning */}
          <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl uppercase tracking-wider">Din order</h2>
            <ul className="mt-4 divide-y divide-border">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.size}`} className="flex gap-3 py-3">
                  <img src={i.product.image} alt={i.product.name} className="h-16 w-16 object-cover" />
                  <div className="flex flex-1 flex-col text-xs">
                    <p className="font-semibold">{i.product.name}</p>
                    <p className="text-muted-foreground">Storlek {i.size} · {i.quantity} st</p>
                    <p className="mt-auto font-semibold">{i.product.price * i.quantity} kr</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
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
            <Button type="submit" size="lg" className="mt-6 w-full font-semibold uppercase tracking-wider">
              Slutför köp
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Fri frakt vid köp över {FREE_SHIPPING_THRESHOLD} kr
            </p>
          </aside>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
