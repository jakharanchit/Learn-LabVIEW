import React from 'react';
import type { MarkdownLesson } from '../types';
import { QuizSystem } from './QuizSystem';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

interface LessonViewerProps {
    lesson: MarkdownLesson;
    onComplete: (result: { score: number; total: number }) => void;
    isCompleted: boolean;
    onNavigate: (direction: 'prev' | 'next') => void;
    canNavigate: { prev: boolean; next: boolean };
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onComplete, isCompleted, onNavigate, canNavigate }) => {
    const LessonContentComponent = lesson.content;
    
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in">
            {isCompleted && (
                <div className="flex items-center gap-2 text-text-success font-medium mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Lesson Completed!</span>
                </div>
            )}
            <Card>
                <Card.Content>
                    <div className="prose dark:prose-invert max-w-none">
                        <LessonContentComponent />
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Title>Knowledge Check</Card.Title>
                <Card.Content>
                    {isCompleted ? (
                         <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-lg font-medium text-text-success">You have already completed this lesson's quiz.</p>
                        </div>
                    ) : (
                        <QuizSystem 
                            key={lesson.id}
                            questions={lesson.quiz} 
                            onQuizComplete={onComplete} 
                        />
                    )}
                </Card.Content>
            </Card>

             <div className="flex justify-between items-center mt-8">
                <Button onClick={() => onNavigate('prev')} disabled={!canNavigate.prev} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button onClick={() => onNavigate('next')} disabled={!canNavigate.next}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
