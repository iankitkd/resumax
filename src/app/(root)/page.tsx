import Features from "@/components/layout/Features";
import HeroSection from "@/components/layout/HeroSection"
import HowItWorks from "@/components/layout/HowItWorks";

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
