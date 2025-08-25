import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import HeroSection from "@/components/landing/HeroSection"
import HowItWorks from "@/components/landing/HowItWorks";
import PreviewImage from "@/components/landing/PreviewImage";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <PreviewImage />
      <Features />
      <HowItWorks/>
      <CTA />
    </div>    
  );
}
