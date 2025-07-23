import React from 'react';

interface IconProps {
  className?: string;
}

export const LabviewIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <rect x="7" y="7" width="4" height="4" rx="1"></rect>
    <rect x="13" y="7" width="4" height="4" rx="1"></rect>
    <rect x="7" y="13" width="4" height="4" rx="1"></rect>
    <path d="M11 9h2"></path>
    <path d="M9 11v2"></path>
    <path d="M15 11v2"></path>
    <path d="M9 15h6"></path>
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);
