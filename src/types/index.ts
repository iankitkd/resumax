export interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: Tip[];
  };
  toneAndStyle: {
    score: number;
    tips: Tip[];
  };
  content: {
    score: number;
    tips: Tip[];
  };
  structure: {
    score: number;
    tips: Tip[];
  };
  skills: {
    score: number;
    tips: Tip[];
  };
}

export interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}


export interface TipCategory {
  id: string;
  title: string;
  icon: string;
  tips: string[];
}