"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    category: "dev",
    links: [
      { label: "GitHub", href: "https://github.com/nushant22" },
    ],
  },
  {
    category: "ai/ml",
    links: [
      { label: "Skill stack", href: "#skills" },
    ],
  },
  {
    category: "ext",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nushantghimire22" },
    ],
  },
  {
    category: "blogs",
    links: [
      { label: "coming soon", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-text-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Red pill-shaped container like navbar */}
          <div className="bg-[#610713] px-10 py-4 rounded-full">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {footerLinks.map((section) => (
                <div key={section.category} className="text-center">
                  <h3 className="text-xs font-display font-bold text-white/60 uppercase tracking-wide mb-2">
                    {section.category}
                  </h3>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-white hover:text-white/80 transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-text-muted/20 pt-6">
          <p className="text-text-muted text-sm text-center">
            sketched on paper, built with code - © Nushant Ghimire
          </p>
        </div>
      </div>
    </footer>
  );
}
