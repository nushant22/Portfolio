"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const terminalCommand = "npx nushantg";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(terminalCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <section className="section-container min-h-screen flex flex-col items-center justify-center pt-24">
      {/* Avatar - Centered below navbar with circular text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 relative"
      >
        <div className="relative w-44 h-44 md:w-52 md:h-52">
          {/* Circular Text - Outside and on top */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -85, 0 a 85,85 0 0,1 170,0"
              />
            </defs>
            <text className="text-xs md:text-sm font-display font-bold fill-white uppercase tracking-[0.4em]">
              <textPath href="#circlePath" startOffset="5%">
                Nushant Ghimire
              </textPath>
            </text>
          </svg>
          
          {/* Circular Avatar */}
          <div className="absolute inset-0 m-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30 shadow-xl">
            <Image
              src="/images/avatar.png"
              alt="Nushant Ghimire"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Terminal Section - Pill Shaped */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <div className="bg-black border-2 border-[#610713] px-6 py-3 rounded-full flex items-center gap-3 group hover:border-[#7a0e1a] transition-colors shadow-lg">
          <span className="text-white font-mono text-xs md:text-sm">
            {terminalCommand}
          </span>
          <button
            onClick={handleCopy}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Copy command"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Content - Centered */}
      <div className="max-w-4xl text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-text-secondary mb-6">
            <span className="text-accent">↳</span>{" "}
            <a 
              href="https://github.com/nushant22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              github.com/nushant22
            </a>
          </p>

          <p className="text-text-secondary mb-4 leading-relaxed">
            Final-year CSIT student. Occasional shipper of side projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-text-secondary leading-relaxed mb-6">
            I studied enough computer science to know that "it works on my machine" 
            is not a deployment strategy. On weeknights I build things - 
            job-matching apps, telemedicine platforms, trading bots that occasionally agree with the market. 
            This whole site started as ballpoint pen on a notebook page, which felt like the honest 
            way to build a portfolio for someone who mostly lives in a terminal.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
