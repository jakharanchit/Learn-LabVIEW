import React, { useState, useContext } from 'react';

interface TabsProps {
  tabs: { label: string; value: string }[];
  onTabChange: (value: string) => void;
  defaultTab: string;
  children: React.ReactNode;
}

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{ activeTab: string }>({ activeTab: '' });

export const Tabs: React.FC<TabsProps> & { Content: React.FC<TabContentProps> } = ({
  tabs,
  onTabChange,
  defaultTab,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab }}>
      <div className="relative">
        <div className="absolute bottom-0 h-px w-full bg-border"></div>
        <div className="relative flex space-x-4 border-b border-transparent">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`relative whitespace-nowrap px-1 py-3 text-sm font-medium transition-colors duration-200
                ${
                  activeTab === tab.value
                    ? 'text-text-accent'
                    : 'text-text-subtle hover:text-text-primary'
                }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </TabsContext.Provider>
  );
};

const TabContent: React.FC<TabContentProps> = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <>{children}</> : null;
};

Tabs.Content = TabContent;
