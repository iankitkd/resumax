import { IconName } from "@/components/Icon/icons";

export const APP_NAME = "Resumax AI";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Resume", href: "/resume" },
  { name: "Pricing", href: "/pricing" },
];

interface FeatureInterface {
    icon: IconName,
    title: string;
    description: string;
}

export const features: FeatureInterface[] = [
  {
    icon: "barChart",
    title: "ATS Score Analysis",
    description: "Get instant feedback on how well your resume performs with Applicant Tracking Systems used by 99% of Fortune 500 companies.",
  },
  {
    icon: "edit",
    title: "Actionable Suggestions",
    description: "Receive specific, easy-to-implement recommendations to improve your resume's content, formatting, and keywords.",
  },
  {
    icon: "search",
    title: "Job Matching",
    description: "See how well your resume aligns with specific job descriptions and get tailored improvement suggestions.",
  },
  {
    icon: "user",
    title: "Personalized Insights",
    description: "Get personalized feedback based on your experience level, industry, and career goals.",
  },
];


export const howItWorks = [
  {
    step: 1,
    title: "Upload Your Resume",
    description: "Securely upload your resume in any format (PDF, DOCX, or TXT). Our AI will scan it while keeping your data private.",
  },
  {
    step: 2,
    title: "Instant Analysis",
    description: "Within seconds, get your ATS score and comprehensive feedback on content, formatting, and keyword optimization.",
  },
  {
    step: 3,
    title: "Implement & Improve",
    description: "Follow our actionable suggestions to optimize your resume. Re-scan anytime to track your improvement.",
  },
];