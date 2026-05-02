import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Hem" },
  { to: "/shop", label: "Shop" },
  { to: "/news", label: "Nyheter" },
  { to: "/about", label: "Om oss" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalCount, setOpen: setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-3xl tracking-widest text-foreground">
          PVP
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Öppna varukorg"
            className="relative rounded-full p-2 text-foreground transition-colors hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Öppna meny"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 md:hidden">
          <ul className="container flex flex-col py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block py-3 text-sm font-medium uppercase tracking-wider",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
