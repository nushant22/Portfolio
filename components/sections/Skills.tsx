"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "dev",
    skills: [
      "Python",
      "React",
      "Node.js / NestJS",
      "Next.js",
      "PostgreSQL / Prisma",
      "FastAPI",
    ],
  },
  {
    category: "ai & devops",
    skills: [
      "TensorFlow",
      "Deep Learning",
      "Data Visualization",
      "Agile / Scrum / Kanban",
      "Kaizen",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Skill Stack
          </h2>
          <p className="text-text-muted">details, roughly grouped</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-sm font-display font-bold text-text-muted uppercase tracking-wide mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-text-secondary flex items-center gap-2"
                  >
                    <span className="text-accent">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
