import React from 'react';

const CollapsibleContext = React.createContext({ open: false, onOpenChange: (open: boolean) => {} });

export const Collapsible: React.FC<{
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    className?: string;
}> = ({ children, open, onOpenChange, className }) => {
    return (
        <CollapsibleContext.Provider value={{ open, onOpenChange }}>
            <div className={className}>{children}</div>
        </CollapsibleContext.Provider>
    );
};

export const CollapsibleTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const { open, onOpenChange } = React.useContext(CollapsibleContext);
    return (
        <button type="button" onClick={() => onOpenChange(!open)} className={className}>
            {children}
        </button>
    );
};

export const CollapsibleContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const { open } = React.useContext(CollapsibleContext);
    return open ? <div className={className}>{children}</div> : null;
};
