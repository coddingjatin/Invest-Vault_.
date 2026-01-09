"use client"

import { motion } from "framer-motion"
import { TrendingUp, Lightbulb } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
}

export function WhoIsItFor() {
  const cards = [
    {
      icon: Lightbulb,
      title: "For Fund Seekers",
      points: [
        "Raise capital efficiently",
        "Showcase your business to serious investors",
        "Get discovered by the right partners",
      ],
    },
    {
      icon: TrendingUp,
      title: "For Investors",
      points: [
        "Discover high-potential startups",
        "Bid competitively for opportunities",
        "Invest with AI-powered insights",
      ],
    },
  ]

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Who Is Invest Vault For?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Two powerful roles, one connected ecosystem</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                className="glassmorphism p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.points.map((point, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
