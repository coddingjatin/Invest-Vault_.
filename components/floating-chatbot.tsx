"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY!
)

async function askGemini(question: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    const prompt = `
You are Invest Vault AI Mentor.
Explain in simple, clear language.
Context: startups, funding, investors, venture capital.

User question: ${question}
`

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Gemini Error:", error)
    return "I'm unable to answer that right now. Please try again shortly."
  }
}

/* ---------------- KNOWLEDGE BASE ---------------- */
const knowledgeBase = {
  // Basic Startup & Investment Knowledge
  "What is a startup?":
    "A startup is a new company founded to solve a problem or fulfill a need. It's usually small initially, grows quickly, and often focuses on innovation. Unlike traditional businesses, startups are built for rapid growth and scaling. Think of Uber, Instagram, or Airbnb - they all started as startups with a simple idea.",
  "What is a venture capitalist (VC)?":
    "A VC is someone who invests money in promising early-stage companies in exchange for a stake (ownership) in the business. VCs provide not just money, but also mentorship and connections. They aim to find the next big company and make returns when it grows. It's like being a smart investor who bets on innovative ideas.",
  "What is an angel investor?":
    "An angel investor is typically a wealthy individual who invests their own money in startups they believe in. Unlike VCs, angels often invest in very early stages and may mentor founders personally. They're called 'angels' because they often save struggling startups! Many successful founders like Elon Musk also act as angel investors.",
  "What is bootstrapping?":
    "Bootstrapping means starting and growing your business using your own money, profits, or resources - without outside investors. It keeps you in full control but requires more personal investment and patience. Many successful companies like Dell and GitHub started bootstrapped. It's a slower but more independent path.",
  "Difference between startup and SME?":
    "A startup is a new venture focused on rapid growth and innovation, often losing money initially. An SME (Small & Medium Enterprise) is an established business with steady revenue and local operations. Startups aim to scale globally fast; SMEs focus on stability. Investing in each carries different risks and rewards.",
  "What is funding?":
    "Funding is money given to a company to help it grow. It can come from investors (equity funding), loans (debt), or grants. Different funding types include angel investments, venture capital, crowdfunding, and bank loans. The right funding helps startups hire, build products, and expand.",
  "Why do startups need funding?":
    "Startups need funding to hire talented people, build products, market themselves, and reach customers before they're profitable. Most startups spend money faster than they make it initially. Funding bridges this gap and accelerates growth. Without it, many great ideas never make it to market.",

  // Investment Types & Terms
  "What is equity?":
    "Equity is ownership in a company. When you invest equity, you own a percentage of the business. If the company grows in value, your stake grows too. But if the company fails, you lose your investment. It's riskier than lending money, but the upside is higher.",
  "What is valuation?":
    "Valuation is the estimated worth of a company. If a startup is valued at $10 million and you invest $1 million, you own 10%. Higher valuations mean the investor owns less for the same investment. It's determined by investors, company growth, and market potential.",
  "What is dilution?":
    "Dilution happens when a company raises more funding - your ownership percentage decreases even though your stake stays the same. If you own 10% and the company raises money and sells new shares, you might own 8%. Early investors experience dilution as the company grows and raises more funds.",
  "What is ROI?":
    "ROI stands for 'Return on Investment' - it measures profit made on an investment. If you invest $100 and get back $150, your ROI is 50%. It shows how much money you made relative to your investment. In venture capital, successful exits can give 10-100x ROI.",
  "What is risk in investing?":
    "Risk is the chance of losing your investment. Early-stage startups are high-risk because many fail. But high-risk investments can also give high returns. Smart investors diversify - they invest in multiple startups so one failure doesn't hurt them too much.",
  "What is a term sheet?":
    "A term sheet is a document outlining the terms of an investment deal. It specifies the investment amount, equity percentage, investor rights, and conditions. Think of it like a prenup for business partnerships. It protects both investors and founders by being clear upfront.",
  "What is due diligence?":
    "Due diligence is the investigation process investors do before investing. They check finances, team capability, market potential, and legal issues. It's like doing homework before a big purchase. Good due diligence helps investors avoid scams and bad investments.",

  // Invest Vault Platform Specific
  "How does Invest Vault work?":
    "Invest Vault connects founders needing capital with investors wanting growth opportunities. Founders create profiles showcasing their business metrics. Investors browse, ask questions, and place bids with their proposed terms. The AI helps match compatible pairs for successful partnerships.",
  "How do I raise funds on Invest Vault?":
    "Start by creating a detailed founder profile with your business story, metrics, and funding goal. Answer investor questions transparently. As investors bid, you review their terms and choose the best fit. Our AI highlights the most suitable investors for your specific needs.",
  "How do investors earn money here?":
    "Investors own equity in the startups they fund. As startups grow in value and eventually exit (get acquired or go public), investors profit from their ownership stake. Some may also earn dividends or liquidation preferences. It's how early Facebook investors made billions.",
  "What is the bidding system?":
    "Investors submit bids with their investment amount, equity offer, and proposed terms. You see all offers and choose the partner that aligns with your vision. Unlike auctions, the highest bidder doesn't automatically win - it's about the best partnership fit.",
  "How does AI recommend startups?":
    "Our AI analyzes startup profiles, market data, and investor preferences to match investors with promising opportunities. It learns what makes successful investments and highlights relevant startups. This smart matching saves time and increases deal success rates.",
  "Is Invest Vault safe and secure?":
    "Yes! We use enterprise-grade encryption, verified profiles, and secure payment handling. All personal data is protected with industry standards. We conduct background checks on investors and verify founder credentials. Your financial information is locked down securely.",
  "Are startups verified?":
    "Yes, we verify founder identity, basic business legitimacy, and financial claims. However, always do your own research. We provide transparency but can't guarantee every business will succeed. Verified doesn't mean zero-risk - it means trustworthy and legitimate.",

  // Government & Support
  "Are there any government schemes for startups?":
    "Yes! Many governments offer grants, subsidized loans, tax benefits, and incubation support. In India, schemes like Startup India, DPIIT, and MSME programs offer incentives. Each country has different programs. Check your local government's startup portal for specific schemes.",
  "Does Invest Vault guide about MSME benefits?":
    "Yes, we help SMEs and MSMEs understand available benefits like GST discounts, equipment subsidies, and preferential government procurement. Our platform guides you on eligibility and documentation. MSMEs have special advantages on Invest Vault too.",
  "Can first-time founders use Invest Vault?":
    "Being a first-time founder doesn't disqualify you. We help first-timers understand the investment process, improve their pitches, and connect with patient investors. Many successful founders raised their first round as first-timers.",

  // Beginner Friendly
  "I have an idea but no company, can I raise funds?":
    "It's possible but challenging. Most investors want to see some execution - a prototype, initial users, or market validation. Use Invest Vault to find co-founders and mentors first. Once you build something tangible, raising becomes much easier.",
  "I am a student, can I use Invest Vault?":
    "Yes, students can launch startups and seek funding! You don't need to be an adult to start. However, investors may want a co-founder with business experience. Use college time to build and validate your idea. Many unicorns were founded by students.",
  "I am new to investing, is this platform for me?":
    "Invest Vault is beginner-friendly. Our AI guides you through the process, and I'm here to answer all your questions. Start small - invest in companies you understand. Over time, you'll become a smarter investor.",
}

const suggestedQuestionsByCategory = {
  startup: ["What is a startup?", "Why do startups need funding?", "What is bootstrapping?"],
  investment: ["What is equity?", "What is ROI?", "What is a term sheet?"],
  platform: [
    "How does Invest Vault work?",
    "How do I raise funds on Invest Vault?",
    "Is Invest Vault safe and secure?",
  ],
  beginner: [
    "I am new to investing, is this platform for me?",
    "I have an idea but no company, can I raise funds?",
    "What is risk in investing?",
  ],
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: "user" | "bot" }[]
  >([
    {
      id: "1",
      text: "Hi, I'm Invest Vault AI. I help founders raise capital and investors invest smartly. What would you like to know?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    setInput("")
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: messageText, sender: "user" },
    ])
    setIsTyping(true)

    let response =
      knowledgeBase[messageText as keyof typeof knowledgeBase]

    if (!response) {
      response = await askGemini(messageText)
    }

    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), text: response, sender: "bot" },
    ])
    setIsTyping(false)
  }

  const getCurrentSuggestions = () => {
    if (
      currentCategory &&
      suggestedQuestionsByCategory[
        currentCategory as keyof typeof suggestedQuestionsByCategory
      ]
    ) {
      return suggestedQuestionsByCategory[
        currentCategory as keyof typeof suggestedQuestionsByCategory
      ]
    }

    if (messages.length <= 1) {
      return [
        "What is a startup?",
        "How does Invest Vault work?",
        "What is equity?",
        "I am new to investing, is this platform for me?",
        "What is a venture capitalist (VC)?",
      ]
    }
    return []
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 transition z-50 glow-effect"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100%-2rem)] h-[500px] glassmorphism rounded-2xl border border-white/10 flex flex-col shadow-2xl z-50"
          >
            {/* Header */}
            <div className="border-b border-white/10 p-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <h3 className="font-semibold text-foreground">
                Invest Vault Mentor
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="px-4 py-2 rounded-lg bg-secondary">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {getCurrentSuggestions().length > 0 && (
              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-xs text-muted-foreground mb-2">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {getCurrentSuggestions().map((q, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 hover:border-primary/70 text-muted-foreground hover:text-foreground hover:bg-primary/5 transition"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask anything..."
                className="flex-1 bg-input text-foreground placeholder-muted-foreground rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-primary/50 transition text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
