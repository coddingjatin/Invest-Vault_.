"use client"

import { motion } from "framer-motion"
import { UserPlus, Settings, Sparkles, Zap } from "lucide-react"

const steps = [
  { icon: UserPlus, title: "Create Profile", desc: "Investor or Fund Seeker" },
  { icon: Settings, title: "Set Preferences", desc: "Risk, Sector, Amount" },
  { icon: Sparkles, title: "AI Matches", desc: "Get Recommendations" },
  { icon: Zap, title: "Competitive Bidding", desc: "Secure Funding" },
]

const StepCard = ({ step, index }: { step: (typeof steps)[0]; index: number }) => {
  const Icon = step.icon
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className="glassmorphism p-6 rounded-xl border border-white/10 text-center">
        <div className="inline-block p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-3xl font-bold text-primary mb-2">{index + 1}</div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.desc}</p>
      </div>
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary/50">→</div>
      )}
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How Invest Vault Works</h2>
          <p className="text-lg text-muted-foreground">Four simple steps to connect capital with opportunity</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-0">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
