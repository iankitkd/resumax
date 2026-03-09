"use client";

import { deleteResult } from "@/actions/results";
import ConfirmationCard from "@/components/shared/ConfirmationCard";
import ModalWrapper from "@/components/shared/ModalWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  previewImage?: string | null;
  previewText?: string | null;
  createdAt: Date | string;
};

export default function ResumeCard({
  id,
  previewImage,
  previewText,
  createdAt,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const deleteResultHandler = async (id: string) => {
    try {
      await deleteResult(id);
      router.refresh();
      setShowConfirm(false);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
      {/* Image */}
      {previewImage ? (
        <div className="h-40 overflow-hidden bg-gray-100">
          <img
            src={previewImage}
            alt="Resume preview"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400">
          No Preview
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-1">
        <p className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <h3 className="font-semibold text-lg">Resume Analysis</h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {previewText ?? "View AI feedback for this resume."}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center pt-3">
          <Link
            href={`/resume?id=${id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View Result
          </Link>

          <button
            className="text-sm text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <ModalWrapper>
          <ConfirmationCard
            title="Delete Resume"
            description="This will permanently delete the resume analysis."
            confirmText="Delete"
            cancelText="Cancel"
            confirmBtnVariant="destructive"
            loadingText="Deleting..."
            disabled={false}
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => deleteResultHandler(id)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
