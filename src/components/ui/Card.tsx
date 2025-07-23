import React from 'react';

interface CardComposition {
    Title: React.FC<{ children: React.ReactNode; className?: string }>;
    Content: React.FC<{ children: React.ReactNode; className?: string }>;
}

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h2 className={`text-lg font-semibold text-text-primary border-b border-border pb-3 mb-4 flex items-center ${className}`}>
        {children}
    </h2>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={className}>{children}</div>
);

type CardProps = {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> & CardComposition = ({ children, className }) => {
    return (
        <div className={`bg-background-card border border-border rounded-lg shadow-sm ${className ?? 'p-6'}`}>
            {children}
        </div>
    );
};

Card.Title = CardTitle;
Card.Content = CardContent;
