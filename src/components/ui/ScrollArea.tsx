import React from 'react';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className, ...props }) => {
    return (
        <div className={`overflow-y-auto ${className}`} {...props}>
            {children}
        </div>
    );
};
