import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Research } from "@/components/Research";
import { Stack } from "@/components/Stack";
import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Focus />
        <Experience />
        <Research />
        <Stack />
        <Education />
        <Terminal />
      </main>
      <Footer />
    </>
  );
}
