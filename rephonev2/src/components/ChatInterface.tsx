"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Sparkles,
  Phone,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  {
    icon: Phone,
    label: "Product Info",
    query: "Tell me about your phone conditions and pricing",
  },
  {
    icon: HelpCircle,
    label: "Support",
    query: "I need help with warranty and returns",
  },
  {
    icon: MessageSquare,
    label: "Compare",
    query: "Help me compare different phone models",
  },
];

const botResponses: Record<
  string,
  { content: string; suggestions?: string[] }
> = {
  "tell me about your phone conditions and pricing": {
    content:
      "I'd be happy to explain our phone conditions and pricing! 📱\n\n**Condition Grades:**\n• **Excellent** (90-95% new) - $50-100 off retail\n• **Very Good** (85-90% new) - $100-200 off retail\n• **Good** (80-85% new) - $200-300 off retail\n• **Fair** (75-80% new) - $300+ off retail\n\n**What's Included:**\n✅ 12-month warranty\n✅ 30-day returns\n✅ Free shipping over $50\n✅ Quality guarantee\n\nAll phones are unlocked and ready to use!",
    suggestions: [
      "Show me iPhone deals",
      "What about Samsung prices?",
      "Tell me about warranty",
    ],
  },

  "i need help with warranty and returns": {
    content:
      "Our warranty and return policy is designed to give you peace of mind! 🛡️\n\n**Warranty Coverage:**\n• **12 months** full warranty\n• Covers manufacturing defects\n• Free repairs or replacement\n• 24/7 customer support\n\n**Return Policy:**\n• **30 days** no-questions-asked returns\n• Free return shipping label\n• Full refund within 3-5 business days\n• No restocking fees\n\n**What's NOT Covered:**\n• Physical damage from drops\n• Water damage\n• Normal wear and tear\n\nNeed to start a return or warranty claim?",
    suggestions: ["Start a return", "Check warranty status", "Contact support"],
  },

  "help me compare different phone models": {
    content:
      "I'd love to help you compare phones! 🔍\n\n**Popular Comparisons:**\n\n**iPhone vs Samsung:**\n• iPhone: Better app ecosystem, longer updates\n• Samsung: More customization, better multitasking\n\n**Flagship vs Mid-range:**\n• Flagship: Better cameras, premium materials\n• Mid-range: Great value, solid performance\n\n**Storage Options:**\n• 128GB: Good for basic use\n• 256GB: Perfect for most users\n• 512GB+: For power users\n\nWhat specific phones are you considering? I can give you a detailed comparison!",
    suggestions: [
      "iPhone 13 vs 14",
      "Samsung Galaxy comparison",
      "Best phones under $500",
    ],
  },

  "show me iphone deals": {
    content:
      "Great choice! Here are our current iPhone deals: 🍎\n\n**iPhone 14 Pro** - $799 (was $999)\n• Excellent condition\n• 128GB, all colors available\n• A16 Bionic chip, Pro cameras\n\n**iPhone 13** - $549 (was $699)\n• Very Good condition\n• 128GB, multiple colors\n• Still incredibly fast\n\n**iPhone 12 Pro Max** - $599 (was $899)\n• Excellent condition\n• 256GB, Pacific Blue popular\n• Large screen, great cameras\n\nAll include free shipping and our 12-month warranty!",
    suggestions: [
      "Compare iPhone models",
      "Check iPhone availability",
      "iPhone trade-in value",
    ],
  },

  "what about samsung prices": {
    content:
      "Samsung offers incredible value! Here are our top deals: 📱\n\n**Galaxy S23 Ultra** - $899 (was $1,199)\n• Excellent condition\n• 256GB, S Pen included\n• 200MP camera, 5000mAh battery\n\n**Galaxy S22** - $499 (was $799)\n• Very Good condition\n• 128GB, compact size\n• Great cameras, smooth 120Hz\n\n**Galaxy Note 20 Ultra** - $599 (was $1,299)\n• Excellent condition\n• 256GB, S Pen productivity\n• Huge screen, premium build\n\nAll Samsung phones are unlocked and work with any carrier!",
    suggestions: ["Galaxy S23 vs S22", "Note series info", "Samsung trade-in"],
  },

  default: {
    content:
      "Hi there! I'm your AI shopping assistant! 🤖✨\n\nI can help you with:\n• Finding the perfect phone for your needs\n• Explaining our conditions and pricing\n• Warranty and return information\n• Product comparisons\n• Technical specifications\n• Order support\n\nWhat would you like to know?",
    suggestions: [
      "Browse iPhone deals",
      "Show Samsung options",
      "Explain phone conditions",
    ],
  },
};

export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "bot",
        content:
          "Hi! I'm your AI shopping assistant! 🤖✨\n\nI'm here to help you find the perfect refurbished phone. I can assist with product information, comparisons, pricing, and any questions you have!\n\nWhat can I help you with today?",
        timestamp: new Date(),
        suggestions: [
          "Browse iPhone deals",
          "Show Samsung options",
          "Explain phone conditions",
        ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (inputRef.current && isOpen && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate realistic typing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 1200)
    );

    const botResponse = generateBotResponse(content.toLowerCase());
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: botResponse.content,
      timestamp: new Date(),
      suggestions: botResponse.suggestions,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const generateBotResponse = (
    userInput: string
  ): { content: string; suggestions?: string[] } => {
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== "default" && userInput.includes(key)) {
        return response;
      }
    }

    // Keyword-based responses
    if (userInput.includes("iphone") || userInput.includes("apple")) {
      return botResponses["show me iphone deals"];
    }

    if (userInput.includes("samsung") || userInput.includes("galaxy")) {
      return botResponses["what about samsung prices"];
    }

    if (userInput.includes("google") || userInput.includes("pixel")) {
      return {
        content:
          "Google Pixel phones offer the purest Android experience! 📸\n\n**Current Pixel Deals:**\n• **Pixel 7 Pro** - $549 (was $899)\n• **Pixel 7** - $399 (was $599)\n• **Pixel 6a** - $299 (was $449)\n\nAll feature incredible cameras with AI photography and get updates directly from Google!",
        suggestions: [
          "Pixel camera features",
          "Android vs iOS",
          "Pixel vs iPhone",
        ],
      };
    }

    if (
      userInput.includes("price") ||
      userInput.includes("cost") ||
      userInput.includes("cheap") ||
      userInput.includes("budget")
    ) {
      return {
        content:
          "Looking for great value? Here are our budget-friendly options! 💰\n\n**Under $300:**\n• iPhone SE (2022) - $279\n• Galaxy A54 - $299\n• Pixel 6a - $299\n\n**Under $500:**\n• iPhone 12 - $449\n• Galaxy S22 - $499\n• Pixel 7 - $399\n\nAll come with the same warranty and return policy as our premium phones!",
        suggestions: [
          "Best phones under $400",
          "iPhone vs Android budget",
          "Financing options",
        ],
      };
    }

    if (userInput.includes("battery") || userInput.includes("performance")) {
      return {
        content:
          "Battery health and performance are crucial! Here's what we guarantee: 🔋\n\n**Battery Standards:**\n• Minimum 80% battery health\n• Most phones 85-95% health\n• Full performance testing\n• Battery replacement available\n\n**Performance Testing:**\n• Stress testing all components\n• Software optimization\n• Speed benchmarking\n• Quality assurance checks\n\nEvery phone performs like new!",
        suggestions: [
          "Check battery health",
          "Performance comparison",
          "Battery replacement cost",
        ],
      };
    }

    if (userInput.includes("shipping") || userInput.includes("delivery")) {
      return {
        content:
          "We make shipping fast and easy! 📦\n\n**Shipping Options:**\n• **Free Standard** (2-3 days) on orders $50+\n• **Express** (1-2 days) - $15\n• **Overnight** - $25\n\n**What's Included:**\n• Tracking number\n• Insurance coverage\n• Secure packaging\n• Signature confirmation\n\nOrders placed before 2 PM ship same day!",
        suggestions: [
          "Track my order",
          "Shipping to my area",
          "International shipping",
        ],
      };
    }

    if (
      userInput.includes("compare") ||
      userInput.includes("difference") ||
      userInput.includes("vs")
    ) {
      return botResponses["help me compare different phone models"];
    }

    if (userInput.includes("warranty") || userInput.includes("return")) {
      return botResponses["i need help with warranty and returns"];
    }

    if (
      userInput.includes("hello") ||
      userInput.includes("hi") ||
      userInput.includes("hey")
    ) {
      return {
        content:
          "Hello! Great to see you! 👋\n\nI'm here to help you find the perfect refurbished phone. Whether you're looking for the latest iPhone, a powerful Samsung Galaxy, or a camera-focused Google Pixel, I can guide you to the best deal!\n\nWhat type of phone interests you most?",
        suggestions: [
          "Show me iPhones",
          "Samsung Galaxy options",
          "Best camera phones",
        ],
      };
    }

    if (userInput.includes("thank") || userInput.includes("thanks")) {
      return {
        content:
          "You're very welcome! 😊 I'm always here to help make your phone shopping experience amazing.\n\nIs there anything else you'd like to know about our phones, policies, or services?",
        suggestions: [
          "Browse more phones",
          "Check order status",
          "Contact human support",
        ],
      };
    }

    return botResponses.default;
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
    const welcomeMessage: Message = {
      id: "welcome-" + Date.now(),
      type: "bot",
      content: "Chat cleared! How can I help you today? 🤖",
      timestamp: new Date(),
      suggestions: [
        "Browse iPhone deals",
        "Show Samsung options",
        "Explain phone conditions",
      ],
    };
    setMessages([welcomeMessage]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-[70] flex items-end md:items-center justify-center p-0 md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`bg-white w-full md:max-w-2xl lg:max-w-4xl overflow-hidden flex flex-col shadow-2xl ${
            isMinimized
              ? "h-16 md:h-20 md:rounded-2xl"
              : "h-full md:h-[700px] md:rounded-2xl"
          }`}
          initial={{ y: "100%", opacity: 0, scale: 0.95 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            height: isMinimized
              ? window.innerWidth >= 768
                ? "5rem"
                : "4rem"
              : window.innerWidth >= 768
              ? "700px"
              : "100%",
          }}
          exit={{ y: "100%", opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    AI Shopping Assistant
                    <Sparkles className="h-4 w-4 text-blue-200" />
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Online • Ready to help you find the perfect phone
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 h-8 w-8 p-0"
                  title="Clear chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 h-8 w-8 p-0 hidden md:flex"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 h-8 w-8 p-0"
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions - Desktop Only */}
            {!isMinimized && (
              <div className="hidden md:block bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      onClick={() => handleQuickAction(action.query)}
                      className="flex items-center gap-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-2 text-sm font-medium transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="h-4 w-4 text-blue-600" />
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMinimized && (
            <>
              {/* Scrollable Messages Area */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-full">
                  <div className="p-4 space-y-6">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        onSuggestionClick={handleSuggestion}
                      />
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
                        <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="text-gray-600 text-sm">
                              AI is thinking...
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Fixed Input Area */}
              <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me about phones, prices, warranty..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }
                    }}
                    disabled={isTyping}
                    className="flex-1 h-12 text-base"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="lg"
                    className="bg-blue-900 hover:bg-blue-800 h-12 px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • Powered by AI • Responses are simulated
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MessageBubble({
  message,
  onSuggestionClick,
}: {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}) {
  const isUser = message.type === "user";

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
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-blue-600" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[85%] md:max-w-[75%] ${isUser ? "text-right" : ""}`}
      >
        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? "bg-blue-900 text-white rounded-tr-md"
              : "bg-gray-100 text-gray-900 rounded-tl-md"
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="block text-left text-sm bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl px-3 py-2 transition-all w-full"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}

        <div
          className={`text-xs text-gray-500 mt-2 ${isUser ? "text-right" : ""}`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
}
