import LandingNav from "@/components/landing/landing-nav";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Features2 from "@/components/landing/features2";
import Tech from "@/components/landing/tech";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Features />
      <Features2 />
      <Tech />
      <Footer />
    </>
  );
}
