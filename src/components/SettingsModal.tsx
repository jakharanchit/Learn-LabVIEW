import React, { useState } from 'react';
import { Button } from './ui/Button';
import { X, Sun, Moon, Monitor, Trash2 } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

interface SettingsModalProps {
  onClose: () => void;
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
  onResetProgress: () => void;
}

const themeOptions: { value: Theme, label: string, icon: React.FC<any> }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, currentTheme, onSetTheme, onResetProgress }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleApply = () => {
    onSetTheme(selectedTheme);
    onClose();
  };
  
  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-background-card rounded-xl shadow-2xl w-full max-w-md m-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-text-subtle" />
          </Button>
        </header>
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-text-secondary">Theme</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedTheme(value)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-md border-2 transition-colors
                    ${selectedTheme === value ? 'border-border-active bg-background-active' : 'border-border-input bg-transparent hover:bg-background-hover'}`}
                >
                  <Icon className={`h-5 w-5 ${selectedTheme === value ? 'text-text-accent' : 'text-text-subtle'}`} />
                  <span className={`text-sm font-medium ${selectedTheme === value ? 'text-text-accent' : 'text-text-secondary'}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">Danger Zone</h3>
            <div className="mt-2 p-4 border border-red-300 dark:border-red-800/50 rounded-lg flex items-center justify-between">
                <div>
                    <p className="font-semibold text-text-primary">Reset Progress</p>
                    <p className="text-sm text-text-subtle">This will permanently delete all your learning data.</p>
                </div>
                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50" onClick={onResetProgress}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Reset
                </Button>
            </div>
          </div>
        </div>
        <footer className="flex justify-end gap-3 p-4 border-t border-border bg-background-emphasis rounded-b-xl">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleApply}>Apply</Button>
        </footer>
      </div>
    </div>
  );
};
