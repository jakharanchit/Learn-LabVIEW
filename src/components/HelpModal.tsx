import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { X, Library, LayoutGrid, Brain, BarChart3 } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const helpSections = [
    {
        icon: Library,
        title: 'Lessons',
        description: 'Browse through a comprehensive list of lessons. Use the filters to find topics by category or difficulty. Click on a lesson card to start learning!',
    },
    {
        icon: LayoutGrid,
        title: 'Examples & References',
        description: 'Explore practical code examples and official guides from the LabVIEW Wiki. Use the tabs to switch between examples and reference guides.',
    },
    {
        icon: Brain,
        title: 'Quizzes',
        description: 'Test your knowledge with standalone quizzes. Your scores will be tracked on the progress page.',
    },
    {
        icon: BarChart3,
        title: 'Progress',
        description: 'Track your learning journey here. See your mastery level, quiz performance, recently completed lessons, and earned achievements.',
    },
];

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-background-card rounded-xl shadow-2xl w-full max-w-2xl m-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Help Center</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-text-subtle" />
          </Button>
        </header>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
                {helpSections.map(section => (
                    <div key={section.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-background-active text-text-accent">
                           <section.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
                            <p className="text-text-subtle mt-1">{section.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <footer className="p-6 border-t border-border text-right bg-background-emphasis rounded-b-xl">
            <Button onClick={onClose}>Got it, thanks!</Button>
        </footer>
      </div>
    </div>
  );
};
