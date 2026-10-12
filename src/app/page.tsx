import { Approach } from "@/components/Approach";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IntakeSection } from "@/components/intake/IntakeSection";
import { NextSteps } from "@/components/NextSteps";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Approach />
        <IntakeSection />
        <NextSteps />
      </main>
      <Footer />
    </>
  );
}
