"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      className="bg-background-card rounded-2xl p-6 border border-text-muted/10 card-hover group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-light transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
          {title}
        </h3>
        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="GitHub Repository"
            >
              <Code size={20} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    </motion.div>
  );
}
