export const Footer = () => (
  <footer className="border-t border-border/60 bg-background">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl tracking-widest">PVP</p>
          <p className="mt-2 text-sm text-muted-foreground">Streetwear made for the streets.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Hoodies</li><li>T-shirts</li><li>Kepsar</li><li>Skor</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kontakt</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@pvp.se</li><li>Stockholm, Sverige</li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-xs text-muted-foreground">© 2026 PVP. Alla rättigheter förbehållna.</p>
    </div>
  </footer>
);
