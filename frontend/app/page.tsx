import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/hero/Hero";
import Highlights from "@/components/sections/Highlights";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Highlights />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
