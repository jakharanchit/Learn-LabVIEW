import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'info';
  title: string;
  description: string;
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const Toast: React.FC<ToastProps> = ({ id, type, title, description, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [id, onDismiss]);

  return (
    <div className="max-w-sm w-full bg-background-card shadow-lg rounded-lg pointer-events-auto ring-1 ring-border overflow-hidden animate-toast-in">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-text-primary">{title}</p>
            <p className="mt-1 text-sm text-text-subtle">{description}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onDismiss(id)}
              className="bg-background-card rounded-md inline-flex text-text-placeholder hover:text-text-subtle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
