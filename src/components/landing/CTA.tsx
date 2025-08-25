"use client"

import { motion } from "motion/react";
import Link from "next/link";

import Icon from "../Icon";
import { Button } from "../ui/Button";

export default function CTA() {
  return (
    <motion.section
      id="cta" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-12 py-16 px-4 text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl"
    >
      <h2 className="text-4xl font-bold mb-6">
        Optimize Your Resume
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Get your resume's ATS compatibility and personalized suggestions to improve your chances of landing interviews.
      </p>

      <Link href={"/upload"}>
        <Button className="py-3 px-4 text-lg md:text-xl text-nowrap font-semibold bg-white text-gray-900 shadow-lg hover:shadow-xl hover:bg-gray-100"> 
          Get Instant Resume Feedback
          <span className="ml-4"><Icon name="arrowRight"/></span>
        </Button>
      </Link>
    </motion.section>
  );
}
