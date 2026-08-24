"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Swastha",
    description:
      "A comprehensive telemedicine platform enabling remote healthcare delivery through video consultation, appointment management, and AI-powered disease prediction. Built as my final year capstone project.",
    tags: ["React", "Node.js", "WebRTC", "Socket.IO", "Prisma", "Python ML"],
    githubUrl: "https://github.com/nushant22",
  },
  {
    title: "FastAPI REST APIs",
    description:
      "Production-ready REST API collection demonstrating CRUD operations, JWT authentication, WebSockets, and automatic API documentation with Swagger UI. Includes middleware, versioning, and best practices.",
    tags: ["FastAPI", "Python", "PostgreSQL", "JWT", "WebSockets"],
    githubUrl: "https://github.com/nushant22",
  },
  {
    title: "LLM From Scratch",
    description:
      "Built core components of Large Language Models from the ground up, implementing tokenization (BPE), embeddings, and attention mechanisms. A deep dive into transformer architecture fundamentals.",
    tags: ["Python", "PyTorch", "Transformers", "NLP", "Deep Learning"],
    githubUrl: "https://github.com/nushant22",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in AI, full-stack development,
            and building production-ready applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/nushant22"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All Projects on GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
