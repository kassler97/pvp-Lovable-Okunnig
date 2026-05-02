import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product, Size } from "@/data/products";

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clear: () => void;
  totalCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (m: ShippingMethod) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
}

export type ShippingMethod = "postnord" | "earlybird" | "dhl";

export const SHIPPING_OPTIONS: { id: ShippingMethod; label: string; price: number; eta: string }[] = [
  { id: "postnord", label: "PostNord", price: 49, eta: "3–5 vardagar" },
  { id: "earlybird", label: "Earlybird", price: 79, eta: "1–2 vardagar" },
  { id: "dhl", label: "DHL", price: 69, eta: "2–3 vardagar" },
];

export const FREE_SHIPPING_THRESHOLD = 599;

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "pvp-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("postnord");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem: CartContextValue["addItem"] = (product, size, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    setOpen(true);
  };

  const removeItem: CartContextValue["removeItem"] = (productId, size) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, size, quantity) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId && i.size === size ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);
    const baseShipping = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)?.price ?? 0;
    const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShipping;
    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      totalCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      shippingMethod,
      setShippingMethod,
      open,
      setOpen,
    };
  }, [items, shippingMethod, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
