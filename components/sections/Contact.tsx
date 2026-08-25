"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="section-container">
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-text-secondary text-lg mb-6 leading-relaxed max-w-3xl mx-auto">
          got a project, a job, or just a good argument about tabs vs. spaces?
        </p>
        <a
          href="mailto:nushantghimire22@gmail.com"
          className="text-accent hover:underline text-lg"
        >
          say hello →
        </a>
      </motion.div>
    </section>
  );
}
