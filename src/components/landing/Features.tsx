"use client";

import { features } from "@/data";
import { motion } from "motion/react";
import Icon from "../Icon";

export default function Features() {
  return (
    <section id="features" className="py-4">

      <div className="text-center max-w-2xl mx-auto pb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-text-primary"
        >
          <div className="text-center text-xl font-semibold text-accent pb-2">
            Features
          </div>
          Transform Your Job Search
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-card flex flex-col items-center border border-border rounded-2xl p-6 hover:scale-[1.02] transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-secondary flex items-center justify-center mb-4">
              <Icon name={feature.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">{feature.title}</h3>
            <p className="text-text-secondary text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
