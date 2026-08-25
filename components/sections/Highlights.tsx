"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const highlights = [
  {
    title: "MatchHire",
    description:
      "An AI-powered, Tinder-style mutual job-matching platform for candidates, recruiters, and admins — because job hunting deserved a swipe interface eventually.",
    tags: ["NestJS", "Next.js", "FastAPI", "Prisma"],
    link: null,
    linkText: "MVP scaffold in progress · private repo",
  },
  {
    title: "Swastha",
    description:
      "A multi-role telemedicine platform for the Nepal market — patients, doctors, and admins, with a disease-prediction ML service quietly doing the hard part.",
    tags: ["React", "Node/Prisma", "WebRTC", "Python ML"],
    link: "https://github.com/nushant22",
    linkText: "view repo →",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Highlights
          </h2>
          <p className="text-text-muted">
            some cool (and slightly silly) things I've made
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {highlights.map((project, index) => (
            <motion.div
              key={project.title}
              className="border border-text-muted/20 rounded-lg p-6 bg-background-card hover:border-text-muted/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-display font-bold mb-3">
                {project.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-background-light border border-text-muted/20 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                >
                  {project.linkText}
                </a>
              ) : (
                <p className="text-sm text-text-muted italic">
                  {project.linkText}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
