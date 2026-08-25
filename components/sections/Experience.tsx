"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Operations Associate — Himalayan Silicon Valley",
    period: "since February 2026",
    description:
      "Lead and coordinate remote data-annotation teams across AI training-data projects — part project manager, part translator between \"the model needs cleaner labels\" and \"the team needs clearer instructions.\"",
  },
  {
    title: "BSc CSIT — Patan Multiple Campus, Tribhuvan University",
    period: "final year",
    description:
      "Capstone: Swastha, a telemedicine platform built to handle the actual weight of Nepal's healthcare access problem, not just a class requirement.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            My Experience
          </h2>
        </div>

        <div className="max-w-4xl">
          <ul className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.title}
                className="border-l-2 border-text-muted/20 pl-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-display font-bold mb-1">
                  {exp.title}
                </h3>
                <p className="text-sm text-text-muted mb-3">{exp.period}</p>
                <p className="text-text-secondary leading-relaxed">
                  {exp.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
