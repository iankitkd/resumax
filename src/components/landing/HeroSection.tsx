'use client';

import Link from "next/link";

import { motion } from "motion/react";
import { Button } from "../ui/Button";

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="relative z-10 lg:min-h-[calc(100vh-52px)] pt-30 py-10 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-center font-bold leading-tight mb-6">
            <p className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
              AI-Powered Resume Analysis
            </p>
            <p className="pt-2 text-3xl md:text-5xl text-text-primary">That Gets You Hired</p>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-center text-text-secondary mb-10 max-w-xl"
        >
          Instantly analyze your resume, get your ATS score, and receive
          actionable suggestions to land more interviews.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={"/upload"}>
            <Button variant="gradient" className="px-12 py-3 text-xl">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}