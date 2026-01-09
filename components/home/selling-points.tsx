"use client"

import { motion } from "framer-motion"
import { MessageSquare, Brain, Shield, TrendingUp } from "lucide-react"

const points = [
  { icon: MessageSquare, title: "AI Chatbot", desc: "Guidance & govt schemes information" },
  { icon: Brain, title: "AI Recommendations", desc: "Powered investment insights" },
  { icon: Shield, title: "Verified Profiles", desc: "Secure & trusted ecosystem" },
  { icon: TrendingUp, title: "Transparent Bidding", desc: "Direct access to opportunities" },
]

export function SellingPoints() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Unique Selling Points</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={i}
                className="glassmorphism p-8 rounded-xl border border-white/10 hover:border-primary/30 transition"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
