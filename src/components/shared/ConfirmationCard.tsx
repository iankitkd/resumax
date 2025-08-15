import React from "react";
import { Button } from "../ui/Button";

interface ConfirmationCardProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  disabled: boolean;
  confirmBtnVariant: "link" | "default" | "outline" | "ghost" | "gradient" | "destructive";
  loadingText?: string;
}

export default function ConfirmationCard({
  title,
  description,
  onCancel,
  onConfirm,
  confirmText,
  cancelText,
  disabled,
  confirmBtnVariant,
  loadingText = "",
}: ConfirmationCardProps) {
  return (
    <div className="w-full sm:w-[350px]">
      <div className="pb-4">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="font-medium text-lg">{description}</p>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={disabled}
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmBtnVariant}
          onClick={onConfirm}
          disabled={disabled}
          isLoading={disabled}
          loadingText={loadingText}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
