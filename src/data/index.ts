import { IconName } from "@/components/Icon/icons";

export const APP_NAME = "Resumax AI";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Upload", href: "/upload" },
  { name: "Pricing", href: "#" },
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


export const AIResponseFormat = `
  interface Feedback {
    overallScore: number; //max 100
    ATS: {
      score: number; //rate based on ATS suitability
      tips: {
        type: "good" | "improve";
        tip: string; 
      }[]; //give 3-4 tips
    };
    toneAndStyle: {
      score: number; //max 100
      tips: {
        type: "good" | "improve";
        tip: string; //make it a short "title" for the actual explanation
        explanation: string; //explain in detail here
      }[]; //give 3-4 tips
    };
    content: {
      score: number; //max 100
      tips: {
        type: "good" | "improve";
        tip: string; //make it a short "title" for the actual explanation
        explanation: string; //explain in detail here
      }[]; //give 3-4 tips
    };
    structure: {
      score: number; //max 100
      tips: {
        type: "good" | "improve";
        tip: string; //make it a short "title" for the actual explanation
        explanation: string; //explain in detail here
      }[]; //give 3-4 tips
    };
    skills: {
      score: number; //max 100
      tips: {
        type: "good" | "improve";
        tip: string; //make it a short "title" for the actual explanation
        explanation: string; //explain in detail here
      }[]; //give 3-4 tips
    };
  }`;

export const prepareAnalysisPrompt = ({jobTitle, jobDescription}: { jobTitle: string; jobDescription: string; }) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  Use the provided job description for which user is applying to give more detailed feedback.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format:
  ${AIResponseFormat}
  Return the analysis as an JSON object, without any other text or comments and without the backticks.`;

export const ANALYSIS_PROMPT = `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  Provide the feedback using the following format:
  ${AIResponseFormat}
  Return the analysis as an JSON object, without any other text or comments and without the backticks.`;



export const ANALYSIS_PROMPT2 = `Please analyze this resume and provide specific, actionable suggestions for improvement in these areas:

1. ATS (Applicant Tracking System) Optimization:
   - Identify missing keywords that are important for the job seeker's industry
   - Suggest improvements for machine readability
   - Check for formatting issues that might cause parsing errors

2. Content and Impact:
   - Identify vague statements and suggest stronger, quantifiable achievements
   - Evaluate the use of action verbs and power words
   - Assess whether responsibilities are converted into achievements

3. Structure and Formatting:
   - Evaluate overall organization and flow
   - Suggest improvements for readability and scannability
   - Check consistency in formatting

4. Skills Section:
   - Evaluate relevance to current job market trends
   - Identify hard vs. soft skills balance
   - Suggest missing skills that are valuable in the industry

5. Professional Summary/Objective:
   - Assess clarity, conciseness, and impact
   - Suggest improvements to make it more compelling
   - Evaluate alignment with target roles

Please provide your analysis in a structured format with clear sections and bullet points. Be specific and provide examples of how to improve each area.`;