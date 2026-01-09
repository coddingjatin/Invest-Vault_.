"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { CheckCircle } from "lucide-react"

const investorJourney = [
  { step: 1, title: "Sign Up", desc: "Create your investor profile with investment preferences" },
  { step: 2, title: "Set Criteria", desc: "Define your risk profile, sector, and investment amount" },
  { step: 3, title: "Browse Opportunities", desc: "Explore verified startups matching your criteria" },
  { step: 4, title: "Place a Bid", desc: "Bid on opportunities with your preferred terms" },
  { step: 5, title: "Connect", desc: "Engage directly with founders for due diligence" },
  { step: 6, title: "Invest", desc: "Complete transaction securely through our platform" },
]

const fundSeekerJourney = [
  { step: 1, title: "Build Profile", desc: "Showcase your business, team, and financials" },
  { step: 2, title: "Set Goals", desc: "Define your funding needs and use of capital" },
  { step: 3, title: "Get Discovered", desc: "AI matches you with relevant investors" },
  { step: 4, title: "Receive Bids", desc: "Get offers from multiple interested investors" },
  { step: 5, title: "Negotiate", desc: "Discuss terms with top investor candidates" },
  { step: 6, title: "Secure Funding", desc: "Close the deal and celebrate your success" },
]

function JourneySection({
  title,
  journey,
  isInvestor,
}: { title: string; journey: typeof investorJourney; isInvestor: boolean }) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {journey.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: isInvestor ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="glassmorphism p-6 rounded-xl border border-white/10 hover:border-primary/30 transition"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="py-20 px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">How Invest Vault Works</h1>
            <p className="text-lg text-muted-foreground">
              Two distinct journeys, one connected platform. Whether you're raising capital or seeking opportunities, we
              make it seamless.
            </p>
          </motion.div>
        </section>

        {/* Journey Sections */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <JourneySection title="Investor Journey" journey={investorJourney} isInvestor={true} />
            <JourneySection title="Fund Seeker Journey" journey={fundSeekerJourney} isInvestor={false} />

            {/* Key Features */}
            <div className="mt-20 pt-20 border-t border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Platform Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "AI-Powered Matching System",
                  "Real-Time Bid Management",
                  "Secure Document Sharing",
                  "Live Chat & Negotiations",
                  "Verified Investor Profiles",
                  "Transaction Escrow Service",
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 p-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingChatbot />
    </>
  )
}
