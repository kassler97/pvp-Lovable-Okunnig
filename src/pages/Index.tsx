import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, news } from "@/data/products";
import hero from "@/assets/hero.jpg";

const Index = () => {
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src={hero}
          alt="PVP FW26 streetwear collection"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative flex h-full flex-col justify-end pb-20">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            FW26 — Out now
          </p>
          <h1 className="mt-4 max-w-3xl animate-fade-up font-display text-6xl leading-none tracking-tight md:text-8xl">
            Built for the <span className="text-gradient-brand">streets</span>.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base text-muted-foreground md:text-lg">
            Vår mörkaste kollektion hittills. Heavyweight fleece, tekniska tyger och en silhuett som inte ber om ursäkt.
          </p>
          <div className="mt-8 flex animate-fade-up gap-4">
            <Button asChild size="lg" className="font-semibold uppercase tracking-wider">
              <Link to="/shop">Shoppa nu <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold uppercase tracking-wider">
              <Link to="/news">Läs mer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Senaste</p>
            <h2 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">Nyheter</h2>
          </div>
          <Link to="/news" className="hidden text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary md:block">
            Alla nyheter →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.id} className="group cursor-pointer border border-border bg-card p-8 transition-colors hover:border-primary">
              <div className="flex items-center gap-3">
                <span className="bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  {n.tag}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{n.date}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight">{n.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
              <p className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary">
                Läs mer <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-card/30 py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Drop</p>
              <h2 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">Nya plagg</h2>
            </div>
            <Link to="/shop" className="hidden text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary md:block">
              Se allt →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
