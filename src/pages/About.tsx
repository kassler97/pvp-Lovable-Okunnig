import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Story</p>
      <h1 className="mt-2 font-display text-6xl tracking-tight md:text-7xl">Om PVP</h1>
      <p className="mt-6 font-display text-2xl italic text-muted-foreground md:text-3xl">
        "Din självklara mjuka-varor butik."
      </p>

      <div className="mt-10 max-w-2xl space-y-6 text-lg text-muted-foreground">
        <p>
          PVP grundades 2026 med en enkel idé: ett litet, noggrant utvalt sortiment av mjukvaror — hoodies, t-shirts, byxor, kepsar och skor — som faktiskt håller.
        </p>
        <p>
          Vi tror inte på att fylla hyllorna med allt. Vi tror på att välja rätt. Varje plagg vi släpper har valts ut med omsorg om material, passform och detaljer. Inga genvägar, inga fyllnadsplagg.
        </p>
        <p>
          Från första skissen till sista sömmen — PVP är gjort för att bli din självklara butik för mjuka varor.
        </p>
      </div>

      <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl text-primary">2026</p>
          <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">Grundat</p>
        </div>
        <div>
          <p className="font-display text-4xl text-primary">5</p>
          <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">Kategorier</p>
        </div>
        <div>
          <p className="font-display text-4xl text-primary">100%</p>
          <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">Noggrant utvalt</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
