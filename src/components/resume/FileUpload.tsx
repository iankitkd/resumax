"use client"

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { formatFileSize } from "@/lib/utils";
import Icon from "../Icon";
import { Button } from "../ui/Button";

const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploaderProps) {
  const [file, setFile] = useState<FileWithPath | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0] || null;
      setFile(newFile)
      onFileSelect?.(newFile);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  return (
    <div className="bg-gradient-to-br from-bg-gradient-start/50 to-bg-gradient-end/50 border border-border p-4 rounded-xl relative text-center cursor-pointer">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer">
          {file ? (
            <div
              className="flex items-center justify-between p-3 bg-card rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Icon name="pdf" className="text-2xl font-semibold text-red-500" />
                <div className="flex flex-col md:flex-row items-baseline space-x-4">
                  <p className="font-medium text-text-primary truncate max-w-48 md:max-w-xs lg:max-w-sm">
                    {file.name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="p-2 hover:bg-background"
                onClick={() => {onFileSelect?.(null); setFile(null);}}
              >
                <Icon name="cancel" className="text-xl font-semibold text-danger" />
              </Button>
            </div>
          ) : (
            <div className="">
              <div className="mx-auto w-10 h-10 flex items-center justify-center mb-2">
                <Icon name="info" className="text-3xl text-accent"></Icon>
              </div>
              <p className="text-lg font-semibold text-text-primary">
                Click to Upload
                <span className="font-normal"> or </span> 
                Drag & Drop
              </p>
              <p className="text-lg text-text-secondary">
                PDF (max {formatFileSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
