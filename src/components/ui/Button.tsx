import React from 'react';

const variants = {
  default: "bg-accent text-text-on-accent hover:bg-accent-hover",
  secondary: "bg-background-emphasis text-text-primary hover:bg-background-hover",
  outline: "bg-background-card border border-border-input text-text-secondary hover:bg-background-hover",
  ghost: "bg-transparent text-text-secondary hover:bg-background-hover",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className, ...props }) => {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-color focus-visible:ring-offset-2 focus-visible:ring-offset-background
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};
