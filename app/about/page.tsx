"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Zap, Globe, Rocket, Shield } from "lucide-react"

const roadmapItems = [
  { year: "2024", title: "Platform Launch", items: ["MVP Launch", "First 100 Users", "AI Matching v1"] },
  { year: "2025", title: "Scale & Integration", items: ["SME Onboarding", "Government Partnerships", "API Access"] },
  { year: "2026", title: "Advanced Features", items: ["Smart Contracts", "DeFi Integration", "Analytics Dashboard"] },
  { year: "2027", title: "Global Expansion", items: ["20+ Countries", "Multi-Currency", "Local Banking Integration"] },
]

export default function AboutPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About Invest Vault</h1>
            <p className="text-lg text-muted-foreground">
              Building the infrastructure for the future of capital allocation
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism p-8 rounded-2xl border border-white/10"
            >
              <Rocket className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Democratizing access to capital by creating a transparent, AI-powered platform where innovative ideas
                meet smart investors. We eliminate friction, reduce barriers, and accelerate growth for entrepreneurs
                and investors alike.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism p-8 rounded-2xl border border-white/10"
            >
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                One trusted platform connecting global capital with innovation. A world where founders and investors
                find each other effortlessly, where decisions are data-driven, and where capital flows to ideas that
                change the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-foreground mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Core Values
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Trust",
                  desc: "Verified profiles, secure transactions, and transparent operations",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  desc: "AI-driven insights and cutting-edge technology at every step",
                },
                {
                  icon: Globe,
                  title: "Accessibility",
                  desc: "Breaking barriers to capital access for all entrepreneurs",
                },
                {
                  icon: Rocket,
                  title: "Growth",
                  desc: "Empowering startups and investors to achieve their potential",
                },
              ].map((value, idx) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={idx}
                    className="glassmorphism p-8 rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 px-6 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-foreground mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Future Roadmap
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {roadmapItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glassmorphism p-6 rounded-xl border border-white/10 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <div className="text-sm font-bold text-primary mb-3">{item.year}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li key={sidx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {subitem}
                      </li>
                    ))}
                  </ul>
                  {idx < roadmapItems.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-primary/30 text-xl">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-white/10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Join the Revolution</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of the team reshaping how capital meets opportunity
            </p>
            <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition glow-effect">
              Get Started Today
            </button>
          </motion.div>
        </section>
      </main>
      <FloatingChatbot />
    </>
  )
}
