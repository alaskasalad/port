import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <main className="frame">
        <Hero />
        <Work />
        <About />
      </main>
      <BackToTop />
    </>
  );
}
