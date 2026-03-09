"use client"

import Image from "next/image";

import { motion } from "motion/react";

export default function PreviewImage() {
  return (
    <section className="py-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{once: true}}
        className="mx-auto max-w-5xl rounded-xl shadow-2xl border border-accent"
      >
        <Image 
          src="/image/previewImage.png" 
          alt="Preview" 
          width={800} 
          height={500} 
          className="w-full h-auto object-cover rounded-xl" 
          priority
          unoptimized
        />
      </motion.div>
    </section>
  );
}


