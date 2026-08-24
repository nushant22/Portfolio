"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Code, Link as LinkIcon } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nushantghimire22@gmail.com",
    href: "mailto:nushantghimire22@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977-9849718035",
    href: "tel:+9779849718035",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lalitpur, Nepal",
    href: null,
  },
];

const socials = [
  {
    icon: Code,
    label: "GitHub",
    href: "https://github.com/nushant22",
  },
  {
    icon: LinkIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nushantghimire22",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-container bg-background-light/50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-text-secondary text-lg">
            I'm always open to discussing new projects, opportunities, or collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <item.icon className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="bg-gradient-to-br from-accent/10 to-accent-dark/10 rounded-2xl p-8 border border-accent/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-4">Let's Collaborate</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Whether you have a project in mind, want to discuss AI/ML opportunities, 
              or just want to connect, I'd love to hear from you.
            </p>
            <p className="text-text-secondary mb-8">
              I'm particularly interested in:
            </p>
            <ul className="space-y-2 mb-8">
              {[
                "AI/ML Engineering roles",
                "Full-Stack Development projects",
                "Open source collaborations",
                "Freelance opportunities",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:nushantghimire22@gmail.com" className="btn-primary w-full justify-center">
              Send Me an Email
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
