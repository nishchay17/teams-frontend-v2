import LandingNav from "@/components/landing/landing-nav";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Tech from "@/components/landing/tech";
import Footer from "@/components/landing/footer";
import CallForAction from "@/components/landing/call-for-action";

export default function Home() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Features />
      <Tech />
      <CallForAction />
      <Footer />
    </>
  );
}
