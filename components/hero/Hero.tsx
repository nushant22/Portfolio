"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="section-container min-h-screen flex flex-col items-center justify-center pt-24">
      {/* Avatar - Centered below navbar with circular text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 relative"
      >
        <div className="relative w-52 h-52 md:w-64 md:h-64">
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
          <div className="absolute inset-0 m-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-accent/30 shadow-xl">
            <Image
              src="/images/avatar.png"
              alt="Nushant Ghimire"
              fill
              sizes="(max-width: 768px) 160px, 192px"
              className="object-cover"
              priority
            />
          </div>
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
            Final-year CSIT student. Professional herder of remote annotation teams. 
            Occasional shipper of side projects.
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
            is not a deployment strategy. On weekdays I coordinate remote data-annotation teams 
            feeding AI training pipelines at Himalayan Silicon Valley. On weeknights I build things — 
            job-matching apps, telemedicine platforms, trading bots that occasionally agree with the market. 
            This whole site started as ballpoint pen on a notebook page, which felt like the honest 
            way to build a portfolio for someone who mostly lives in a terminal.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
