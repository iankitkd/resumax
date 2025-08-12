import React from 'react'
import ModalWrapper from '../shared/ModalWrapper'
import ConfirmationCard from '../shared/ConfirmationCard';

interface SignoutModalProps {
    close: () => void;
    handleSignout: () => void;
}

export default function SignoutModal({close, handleSignout}: SignoutModalProps) {
  return (
    <ModalWrapper>
      <ConfirmationCard
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleSignout}
        onCancel={close}
        confirmBtnVariant="destructive"
        disabled={false}
      />
    </ModalWrapper>
  )
}
