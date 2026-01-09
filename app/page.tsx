"use client"
import { HeroSection } from "@/components/home/hero-section"
import { WhoIsItFor } from "@/components/home/who-is-it-for"
import { HowItWorks } from "@/components/home/how-it-works"
import { SellingPoints } from "@/components/home/selling-points"
import { PlatformImpact } from "@/components/home/platform-impact"
import { FinalCTA } from "@/components/home/final-cta"
import { Navigation } from "@/components/navigation"
import { FloatingChatbot } from "@/components/floating-chatbot"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <WhoIsItFor />
        <HowItWorks />
        <SellingPoints />
        <PlatformImpact />
        <FinalCTA />
      </main>
      <FloatingChatbot />
    </>
  )
}
