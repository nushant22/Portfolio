"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      // TODO: Add API call to chat endpoint
      console.log("Message:", message);
      setTimeout(() => {
        setIsTyping(false);
        setMessage("");
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Try Me Label */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="text-accent w-4 h-4" />
        <span className="text-sm text-text-secondary font-medium tracking-wide">Try me</span>
      </div>

      {/* Chat Input Box */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex items-center gap-3 bg-background-light/50 backdrop-blur-sm border-2 border-text-muted/20 rounded-full px-5 py-3 shadow-xl transition-all duration-300 hover:border-accent/40 focus-within:border-accent/60 focus-within:shadow-2xl focus-within:shadow-accent/10">
          {/* Input Field */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about my work, skills, or projects..."
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted/60 text-sm [&]:border-0 [&]:outline-0 [&]:ring-0 [&:focus]:border-0 [&:focus]:outline-0 [&:focus]:ring-0"
            disabled={isTyping}
            style={{ border: 'none !important', boxShadow: 'none !important', outline: 'none !important' }}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className="flex-shrink-0 p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-accent/10 disabled:hover:text-accent"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle glow effect on focus */}
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
      </form>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-sm text-text-muted flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3 h-3 text-accent animate-pulse" />
          <span>Thinking</span>
          <span className="inline-flex gap-0.5">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
