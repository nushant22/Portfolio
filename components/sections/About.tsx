"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Expertise",
    description: "Building LLMs from scratch, implementing transformers, and working with deep learning frameworks",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Creating scalable web applications with React, Node.js, FastAPI, and PostgreSQL",
  },
  {
    icon: Rocket,
    title: "Project Leadership",
    description: "Coordinating cross-functional teams using Agile, Scrum, and Kanban methodologies",
  },
];

export default function About() {
  return (
    <section id="about" className="section-container bg-background-light/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
            
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border-4 border-accent/30 bg-background-card">
              <div className="aspect-square relative flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-accent">N</span>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Add profile.jpg to<br />public/images/
                  </p>
                </div>
              </div>
            </div>

            {/* Accent circle */}
            <motion.div
              className="absolute -right-12 top-1/2 w-24 h-24 border-8 border-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              I'm Nushant Ghimire, a final-year BSc CSIT student passionate about AI engineering 
              and full-stack development. I specialize in building intelligent systems that combine 
              modern web technologies with cutting-edge machine learning approaches.
            </p>
            
            <p>
              Currently working as an Operations Associate at Himalayan Silicon Valley, where I lead 
              remote teams on AI training-data annotation projects. I apply Agile methodologies and 
              continuous improvement principles to deliver high-quality results across multiple projects.
            </p>
            
            <p>
              I'm particularly interested in Large Language Models, Transformer architectures, 
              real-time communication systems, and building production-ready REST APIs.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="mt-12 space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <item.icon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a href="#contact" className="btn-primary">
              Let's Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
