import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ className, value = 0, ...props }) => {
  return (
    <div
      className={`relative h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-accent transition-all duration-500"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};
