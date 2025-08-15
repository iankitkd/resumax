"use client";

import { motion } from "motion/react";

import { howItWorks } from "@/data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-4">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
        >
          <div className="text-center text-xl font-semibold text-indigo-500 pb-2">
            How to use?
          </div>
          How it Works?
        </motion.h2>
      </div>

      <div className="relative max-w-4xl md:mx-auto ml-4">
        {/* Timeline */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>

        <div className="space-y-16">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-row items-start"
            >
              <div className="w-8 md:w-16 h-8 md:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold mb-0 mr-4 md:mr-8 flex-shrink-0">
                {item.step}
              </div>
              <div className="text-left">
                <h3 className="text-2xl text-gray-900 font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
