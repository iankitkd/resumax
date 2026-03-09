"use client";

import { useState } from "react";

import { tipCategories } from "@/data/tips";

export default function ResumeTips() {
  const [activeCategory, setActiveCategory] = useState(tipCategories[0].id);
  const activeCategoryData = tipCategories.find((category) => category.id === activeCategory);

  return (
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-text-primary py-4">
        Resume Excellence Guide
      </h1>
      <p className="text-xl text-text-secondary max-w-4xl mx-auto mb-6">
        Expert tips to optimize your resume for Applicant Tracking Systems (ATS) and impress recruiters
      </p>

      <div className="flex gap-2 md:gap-4 mb-6 py-2 overflow-scroll scrollbar-hidden">
        {tipCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
              activeCategory === category.id
                ? "bg-accent text-white shadow-lg"
                : "bg-card text-text-secondary hover:bg-card/85 hover:text-accent shadow-md"
            }`}
          >
            <span className="text-xl mr-2">{category.icon}</span>
            <span className="font-medium whitespace-nowrap">{category.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end border border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 md:p-6 bg-card text-text-primary">
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <span className="text-2xl mr-2">{activeCategoryData?.icon}</span>
            {activeCategoryData?.title} Tips
          </h2>
        </div>

        <div className="p-6 md:p-8">
          <ul className="space-y-5">
            {activeCategoryData?.tips.map((tip, index) => (
              <li key={index} className="flex items-start justify-start">
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-background text-accent font-medium">
                    {index + 1}
                  </div>
                </div>
                <p className="text-text-secondary text-lg text-left">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
