import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CodeDemoSection } from "@/components/landing/CodeDemoSection";
import { ExercisesPreview } from "@/components/landing/ExercisesPreview";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CodeDemoSection />
        <ExercisesPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;