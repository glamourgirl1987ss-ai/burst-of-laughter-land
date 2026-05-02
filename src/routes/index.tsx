import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { HowToPlay } from "@/components/landing/HowToPlay";
import { Gallery } from "@/components/landing/Gallery";
import { Product } from "@/components/landing/Product";
import { OrderForm } from "@/components/landing/OrderForm";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main
      className="min-h-screen bg-fun-cream font-body text-fun-ink"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <Nav />
      <Hero />
      <About />
      <HowToPlay />
      <Gallery />
      <Product />
      <OrderForm />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
