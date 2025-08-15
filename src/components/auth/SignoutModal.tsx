import React, { useState } from 'react'
import ModalWrapper from '../shared/ModalWrapper'
import ConfirmationCard from '../shared/ConfirmationCard';

interface SignoutModalProps {
  close: () => void;
  handleSignout: () => void;
}

export default function SignoutModal({close, handleSignout}: SignoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true);
    handleSignout();
  }

  return (
    <ModalWrapper>
      <ConfirmationCard
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={onConfirm}
        onCancel={close}
        confirmBtnVariant="destructive"
        disabled={isLoading}
        loadingText="Logging out..."
      />
    </ModalWrapper>
  )
}
