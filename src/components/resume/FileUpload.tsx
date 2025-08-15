"use client"

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { formatFileSize } from "@/lib/utils";
import Icon from "../Icon";
import { Button } from "../ui/Button";

const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
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

  const file = acceptedFiles[0] || null;

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-4 rounded-xl relative text-center cursor-pointer">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer">
          {file ? (
            <div
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Icon name="pdf" className="text-2xl font-semibold text-red-600" />
                <div className="flex flex-col md:flex-row items-baseline space-x-4">
                  <p className="font-medium text-gray-700 truncate max-w-48 md:max-w-xs lg:max-w-sm">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="p-2 hover:bg-red-50"
                onClick={() => onFileSelect?.(null)}
              >
                <Icon name="cancel" className="text-xl font-semibold text-red-400" />
              </Button>
            </div>
          ) : (
            <div className="">
              <div className="mx-auto w-10 h-10 flex items-center justify-center mb-2">
                <Icon name="info" className="text-3xl text-indigo-800"></Icon>
              </div>
              <p className="text-lg font-semibold text-gray-500">
                Click to Upload
                <span className="font-normal"> or </span> 
                Drag & Drop
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatFileSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
