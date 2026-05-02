import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Story</p>
      <h1 className="mt-2 font-display text-6xl tracking-tight md:text-7xl">Om PVP</h1>
      <div className="mt-8 max-w-2xl space-y-6 text-lg text-muted-foreground">
        <p>
          PVP är ett svenskt streetwear-märke byggt på en enda idé: kläder som håller — i kvalitet, i stil och över tid.
        </p>
        <p>
          Från heavyweight hoodies till tekniska sneakers designar vi varje plagg med omsorg om material, passform och detaljer. Inga genvägar.
        </p>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
