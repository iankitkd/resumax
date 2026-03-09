"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/Button";
import Icon from "../Icon";
import FileUpload from "./FileUpload";
import FormError from "../shared/FormError";
import { pdfToImage } from "@/utils/pdfToImage";

interface JdValues {
  companyName?: string;
  jobTitle: string;
  jobDescription: string;
}

export default function UploadSection() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isJDOpen, setIsJDOpen] = useState(false);

  const [error, setError] = useState("");
  const [jd, setJd] = useState<JdValues>({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!file) {
      setError("Resume File is required");
      return;
    }

    if(isJDOpen && (!jd.jobTitle || !jd.jobDescription)) {
      setError("Job Title & Job Description is required");
      return;
    }

    setIsProcessing(true);
    setStatusText("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Extracting text
      setStatusText("Extracting text...");
      const extractRes = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!extractRes.ok) {
        throw new Error('Failed to extract text from PDF');
      }
      const {text} = await extractRes.json();

      if(text.length < 10) {
        throw new Error('Very less text found.');
      }

      const arrayBuffer = await file.arrayBuffer();
      // Analyzing
      setStatusText("Converting to Image ...");
      setTimeout(()=> {
        setStatusText("Analyzing ...");
      }, 10_000)

      const [imageUrls, analyzeRes] = await Promise.all([
        pdfToImage(arrayBuffer, 1),

        fetch('/api/analyze-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ text: text, jobTitle: jd.jobTitle, jobDescription: jd.jobDescription}),
        }),
      ]);

      if (!analyzeRes.ok) {
        throw new Error('Failed to analyze resume');
      }
      const {data} = await analyzeRes.json();

      // Saving
      setStatusText("Generating url ...");
      const saveRes = await fetch('/api/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result: data, imageUrl: imageUrls[0]}),
      });

      if (!saveRes.ok) {
        throw new Error('Failed to generate url');
      }
      const {id} = await saveRes.json();

      // Redirecting
      setStatusText("Analyzing Complete, redirecting...");
      router.push(`/resume?id=${encodeURIComponent(id)}`);
    } catch (error) {
      console.log(error);
      if(error instanceof Error) setError(error.message);
      setIsProcessing(false);
    }
  };


  return (
    <div className="page-heading px-2 md:px-0 py-6 flex flex-col items-center">
      <h1 className="font-bold text-text-primary text-3xl text-center mb-4">
        Smart feedback for your resume
      </h1>
      <h2 className={`${isProcessing ? "font-semibold text-xl mt-2" : "font-medium"} text-text-secondary text-center mb-8`}>
        {isProcessing ? statusText : "Drop your resume for an ATS score and improvement tips"}
      </h2>
      {imageUrl && (<img src={imageUrl}/>)}

      {isProcessing ? (
        <div className="w-full max-w-md">
          <img src="/image/scan.gif" alt="Scan gif" className="w-full" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xl"
        >
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="uploader" className="font-semibold text-lg">Upload Resume</label> */}
            <FileUpload onFileSelect={handleFileSelect} />
            {/* <p className="text-sm text-gray-500">* Your resume is encrypted.</p> */}
          </div>

          <div className="flex gap-2 py-4 justify-between cursor-pointer"
            onClick={() => setIsJDOpen(!isJDOpen)}
          >
            <label htmlFor="add-jd" className="font-bold text-xl cursor-pointer" >
              {isJDOpen ? "Remove" : "Add"} Job Description
            </label>
            <span id="add-jd" className="w-6 h-6">
              {isJDOpen ? (
                <Icon name="minus" className="w-full h-full" />
              ) : (
                <Icon name="plus" className="w-full h-full" />
              )}
            </span>
          </div>

          {isJDOpen && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="company-name" className="font-semibold text-lg">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  placeholder="Company Name"
                  value={jd.companyName}
                  onChange={(e) => setJd((prev) => ({...prev, companyName: e.target.value}) )}
                  className="w-full p-2 rounded-xl outline-0 focus:ring-1 ring-accent bg-card"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="job-title" className="font-semibold text-lg">
                  Job Title <span className="text-red-500 text-sm">*</span>
                </label>
                <input
                  type="text"
                  id="job-title"
                  placeholder="Job Title"
                  value={jd.jobTitle}
                  onChange={(e) => setJd((prev) => ({...prev, jobTitle: e.target.value}))}
                  className="w-full p-2 rounded-xl outline-0 focus:ring-1 ring-accent bg-card"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="job-description" className="font-semibold text-lg" >
                  Job Description <span className="text-red-500 text-sm">*</span>
                </label>
                <textarea
                  rows={5}
                  id="job-description"
                  placeholder="Job Description"
                  value={jd.jobDescription}
                  onChange={(e) => setJd((prev) => ({...prev, jobDescription: e.target.value}) )}
                  className="p-2 rounded-xl min-h-[160px] outline-0 focus:ring-1 ring-accent bg-card"
                />
              </div>
            </>
          )}

          {error && <FormError message={error}/> }

          <Button variant="gradient" className="w-full py-3 text-xl" type="submit" >
            Analyze Resume
          </Button>
        </form>
      )}
    </div>
  );
}
