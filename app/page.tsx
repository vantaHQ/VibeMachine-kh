import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrendingSection } from "@/components/trending-section"
import { VibeGrid } from "@/components/vibe-grid"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { VideoBackground } from "@/components/video-background"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black scroll-smooth">
      <VideoBackground />
      
      {/* Navbar is fixed, so its position here is fine */}
      <Navbar />
      
      <div className="relative z-10">
        {/* Hero Section: Ensure you've removed the redundant icon 
           row inside components/hero.tsx to clean up the UI 
        */}
        <Hero />
        
        {/* Discover Section - Negative margins pull this up to bridge the gap */}
        <div className="-mt-16 md:-mt-32 pb-10">
           <VibeGrid />
        </div>

        {/* Budget Section - Tighter padding to keep the flow snappy */}
        <div className="py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
           <PricingSection />
        </div>

        {/* Results Section - The 'Trending' heavy hitters */}
        <TrendingSection />
        
        <Footer />
      </div>
    </main>
  )
}