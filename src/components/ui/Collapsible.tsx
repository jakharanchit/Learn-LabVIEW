import React from 'react';

// 1. Define an explicit Context type
export type CollapsibleContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// 2. Create a default context value conforming to the type
const defaultContext: CollapsibleContextType = {
  open: false,
  onOpenChange: () => {},
};

// 3. Initialize the context with the explicit type
const CollapsibleContext = React.createContext<CollapsibleContextType>(defaultContext);

// 4. Collapsible provider component
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

// 5. Trigger component to toggle open/closed state
export const CollapsibleTrigger: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { open, onOpenChange } = React.useContext(CollapsibleContext);
  return (
    <button
      type="button"
      onClick={() => onOpenChange(!open)}
      className={className}
    >
      {children}
    </button>
  );
};

// 6. Content component that only renders when open is true
export const CollapsibleContent: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { open } = React.useContext(CollapsibleContext);
  return open ? <div className={className}>{children}</div> : null;
};
