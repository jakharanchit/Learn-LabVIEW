import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Separator: React.FC<SeparatorProps> = ({ className, ...props }) => {
    return (
        <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} {...props} />
    );
};
