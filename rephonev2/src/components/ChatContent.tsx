"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  isTyping?: boolean
}

const quickQuestions = [
  "What's the difference between conditions?",
  "Do you offer warranty?",
  "How does shipping work?",
  "Can I return a phone?",
  "What payment methods do you accept?",
  "Are the phones unlocked?",
]

const botResponses: Record<string, string> = {
  "what's the difference between conditions":
    "Great question! Here's how we grade our phones:\n\n• **Excellent**: Like new with minimal signs of use\n• **Very Good**: Minor cosmetic wear, perfect functionality\n• **Good**: Some visible wear but fully functional\n• **Fair**: Noticeable wear but great value\n\nAll phones are thoroughly tested regardless of condition!",

  "do you offer warranty":
    "Yes! All our refurbished phones come with:\n\n• **12-month warranty** covering defects\n• **30-day return policy** if you're not satisfied\n• **Free technical support** via chat or phone\n• **Quality guarantee** - every phone is tested\n\nYour peace of mind is our priority! 🛡️",

  "how does shipping work":
    "We make shipping simple:\n\n• **Free shipping** on orders over $50\n• **2-3 business days** standard delivery\n• **Next-day delivery** available for $15\n• **Tracking included** with all orders\n• **Secure packaging** to protect your phone\n\nOrders placed before 2PM ship same day! 📦",

  "can i return a phone":
    "Our return policy is customer-friendly:\n\n• **30 days** to return for any reason\n• **Free return shipping** with prepaid label\n• **Full refund** processed within 3-5 days\n• **No restocking fees** ever\n• **Original packaging** not required\n\nWe want you to be 100% happy with your purchase! ✅",

  "what payment methods do you accept":
    "We accept all major payment methods:\n\n• **Credit/Debit Cards** (Visa, Mastercard, Amex)\n• **PayPal** for secure checkout\n• **Apple Pay** & **Google Pay**\n• **Buy now, pay later** with Klarna\n• **Bank transfers** for large orders\n\nAll payments are secured with 256-bit encryption! 🔒",

  "are the phones unlocked":
    "Most of our phones are unlocked! Here's what you need to know:\n\n• **95% of phones** are factory unlocked\n• **Works with all carriers** (Verizon, AT&T, T-Mobile, etc.)\n• **International compatibility** for travel\n• **Carrier-locked phones** are clearly marked\n• **Free unlock service** available if needed\n\nCheck the product page for specific carrier info! 📱",

  default:
    "I'm here to help with any questions about our refurbished phones! I can assist with:\n\n• Product information and comparisons\n• Shipping and return policies\n• Technical specifications\n• Order status and support\n• Warranty and condition details\n\nWhat would you like to know? 😊",
}

export default function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AI assistant. I'm here to help you find the perfect refurbished phone and answer any questions you have! 👋\n\nWhat can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Generate bot response
    const botResponse = generateBotResponse(content.toLowerCase())
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: botResponse,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botMessage])
  }

  const generateBotResponse = (userInput: string): string => {
    // Check for specific keywords
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== "default" && userInput.includes(key)) {
        return response
      }
    }

    // Check for product-related queries
    if (userInput.includes("iphone") || userInput.includes("apple")) {
      return "We have a great selection of refurbished iPhones! From iPhone 12 to iPhone 14 Pro, all in excellent condition. Would you like me to show you our current iPhone deals? 📱✨"
    }

    if (userInput.includes("samsung") || userInput.includes("galaxy")) {
      return "Samsung Galaxy phones are very popular! We carry Galaxy S22, S23, Note series, and more. All come with S Pen (for Note/Ultra models) and are thoroughly tested. What Samsung model interests you? 🌟"
    }

    if (userInput.includes("google") || userInput.includes("pixel")) {
      return "Google Pixel phones offer the purest Android experience! Great cameras, fast updates, and AI features. We have Pixel 6, 7, and 8 series available. Need help choosing? 📸🤖"
    }

    if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("cheap")) {
      return "Our refurbished phones offer amazing value! Prices start from $199 and go up to $899 for flagship models. You save 30-50% compared to new phones while getting the same great experience! 💰"
    }

    if (userInput.includes("battery") || userInput.includes("performance")) {
      return "All our phones undergo battery testing! We ensure:\n\n• Battery health above 80%\n• Performance testing for smooth operation\n• Full functionality check\n• Software optimization\n\nMost phones perform like new! 🔋⚡"
    }

    if (userInput.includes("compare") || userInput.includes("difference")) {
      return "I'd love to help you compare phones! You can use our comparison tool to see side-by-side specs, or tell me which models you're considering and I'll highlight the key differences. What phones are you looking at? 🔍"
    }

    if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
      return "Hello! Great to meet you! 😊 I'm here to help you find the perfect refurbished phone. Are you looking for a specific brand or have any questions about our products?"
    }

    if (userInput.includes("thank") || userInput.includes("thanks")) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know about our phones or services? 😊"
    }

    // Default response
    return botResponses.default
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-md p-3 max-w-[80%]">
                <div className="flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  <span className="text-gray-500 text-sm">AI is typing...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
          <div className="grid grid-cols-1 gap-2">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <motion.button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="text-left text-sm bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about our phones..."
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(inputValue)
              }
            }}
            disabled={isTyping}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="bg-blue-900 hover:bg-blue-800"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send • AI responses are simulated</p>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.type === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-blue-900" : "bg-blue-100"
        }`}
      >
        {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-blue-600" />}
      </div>

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`rounded-2xl p-3 ${
            isUser ? "bg-blue-900 text-white rounded-tr-md" : "bg-gray-100 text-gray-900 rounded-tl-md"
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : ""}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </motion.div>
  )
}
