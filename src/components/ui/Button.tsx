import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'gradient' | 'destructive';
  isLoading?: boolean;
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'default', 
    className = '',
    isLoading = false,
    loadingText = "Loading...",
    ...props 
  }, ref) => {
    
    const baseClasses = "px-6 py-2 inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantClasses = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg py-2 shadow-md hover:shadow-lg",
      outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
      ghost: "hover:bg-indigo-50 text-indigo-600",
      link: "text-indigo-600 hover:underline",
      destructive: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
    }[variant];
    
    const spinnerClasses = "animate-spin -ml-1 mr-2 h-4 w-4 text-current";
    
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses, className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className={spinnerClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };