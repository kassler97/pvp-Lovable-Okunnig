import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { news } from "@/data/products";

const News = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Journal</p>
      <h1 className="mt-2 font-display text-6xl tracking-tight md:text-7xl">Nyheter</h1>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {news.map((n) => (
          <article key={n.id} className="border border-border bg-card p-8 transition-colors hover:border-primary">
            <div className="flex items-center gap-3">
              <span className="bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">{n.tag}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{n.date}</span>
            </div>
            <h2 className="mt-6 font-display text-3xl tracking-tight">{n.title}</h2>
            <p className="mt-3 text-muted-foreground">{n.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </div>
);

export default News;
