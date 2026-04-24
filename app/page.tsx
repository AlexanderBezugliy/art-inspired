import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GalleryGrid } from "@/components/gallery-grid";
import { SearchSection } from "@/components/search-section";
import { MissionSection } from "@/components/mission-section";
import { SolutionSection } from "@/components/solution-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Gallery Grid (4x4) */}
        <GalleryGrid />

        {/* Search has changed Section */}
        {/* <SearchSection /> */}

        {/* Mission Section */}
        <MissionSection />

        {/* Solution Section */}
        <SolutionSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
