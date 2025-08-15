import Features from "@/components/landing/Features";
import HeroSection from "@/components/landing/HeroSection"
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      {/* Image */}
      <Features />
      <HowItWorks/>
    </div>    
  );
}
