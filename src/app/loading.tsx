import React from 'react'

export default function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent"></div>
    </div>
  );
}
