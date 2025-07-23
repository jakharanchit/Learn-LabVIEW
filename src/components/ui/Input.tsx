import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-border-input bg-background-card px-3 py-2 text-sm 
                   file:border-0 file:bg-transparent file:text-sm file:font-medium 
                   placeholder:text-text-placeholder
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-color
                   disabled:cursor-not-allowed disabled:opacity-50
                   ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
