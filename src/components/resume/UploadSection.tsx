"use client";

import { Button } from "../ui/Button";
import Icon from "../Icon";
import FileUpload from "./FileUpload";
import { FormEvent, useState } from "react";

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isJDOpen, setIsJDOpen] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(file);
    setIsProcessing(true);
    setStatusText("");
  };


  return (
    <div className="page-heading px-2 md:px-0 py-4 flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center mb-4">
        Smart feedback for your resume
      </h1>
      <h2 className="font-medium text-center mb-8">
        {isProcessing ? statusText : "Drop your resume for an ATS score and improvement tips"}
      </h2>

      {isProcessing ? (
        <div className="w-full max-w-md">
          <img src="/scan.gif" alt="Scan gif" className="w-full" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xl"
        >
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="uploader" className="font-semibold text-lg">Upload Resume</label> */}
            <FileUpload onFileSelect={handleFileSelect} />
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
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                  className="w-full p-2 rounded-xl outline-0 focus:ring-1 ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="job-title" className="font-semibold text-lg">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                  className="w-full p-2 rounded-xl outline-0 focus:ring-1 ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="job-description" className="font-semibold text-lg" >
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                  className="p-2 rounded-xl min-h-[160px] outline-0 focus:ring-1 ring-indigo-500 bg-white"
                />
              </div>
            </>
          )}

          <Button variant="gradient" className="w-full py-3 text-xl" type="submit" >
            Analyze Resume
          </Button>
        </form>
      )}
    </div>
  );
}
