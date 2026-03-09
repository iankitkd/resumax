"use client";

import { motion } from "motion/react";
import Link from "next/link";

import Icon from "../Icon";
import { Button } from "../ui/Button";

export default function CTA() {
  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative mt-24"
    >
      <div className="relative overflow-hidden bg-card border border-border rounded-2xl py-20 px-6 text-center">

        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Optimize Your Resume with AI
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary mb-10">
            Instantly analyze your resume, check ATS compatibility, and get
            actionable suggestions to improve your chances of landing interviews.
          </p>

          {/* CTA Button */}
          <Link href="/upload">
            <Button
              className="px-10 py-3 text-lg font-semibold bg-gradient-to-r from-accent to-accent-secondary text-white hover:opacity-90 transition shadow-lg"
            >
              Get Instant Resume Feedback
              <span className="ml-3">
                <Icon name="arrowRight" />
              </span>
            </Button>
          </Link>

        </div>
      </div>
    </motion.section>
  );
}