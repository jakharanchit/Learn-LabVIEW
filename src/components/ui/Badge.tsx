import React from 'react';

const variants = {
  default: "bg-blue-100 text-blue-800 border-transparent dark:bg-blue-900/50 dark:text-blue-300",
  secondary: "bg-gray-100 text-gray-800 border-transparent dark:bg-gray-800 dark:text-gray-300",
  outline: "bg-transparent text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700",
  green: "bg-green-100 text-green-800 border-transparent dark:bg-green-900/50 dark:text-green-300",
  yellow: "bg-yellow-100 text-yellow-800 border-transparent dark:bg-yellow-900/50 dark:text-yellow-300",
  red: "bg-red-100 text-red-800 border-transparent dark:bg-red-900/50 dark:text-red-300",
  hard: "bg-purple-100 text-purple-800 border-transparent dark:bg-purple-900/50 dark:text-purple-300",
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof variants;
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
    return (
        <div
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring-color focus:ring-offset-2 ${variants[variant]} ${className}`}
            {...props}
        />
    );
};
