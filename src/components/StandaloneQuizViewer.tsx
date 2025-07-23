import React from 'react';
import type { StandaloneQuiz } from '../types';
import { QuizSystem } from './QuizSystem';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowLeft } from 'lucide-react';

interface StandaloneQuizViewerProps {
    quiz: StandaloneQuiz;
    onComplete: (result: { score: number; total: number }) => void;
    onBack: () => void;
}

export const StandaloneQuizViewer: React.FC<StandaloneQuizViewerProps> = ({ quiz, onComplete, onBack }) => {
    return (
        <div className="min-h-full">
            <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in">
                 <Button onClick={onBack} variant="outline" size="sm" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quizzes
                </Button>
                <header>
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-primary mb-2">{quiz.title}</h1>
                    <p className="text-lg text-text-subtle">{quiz.description}</p>
                </header>
                
                <Card>
                    <Card.Title>Knowledge Assessment</Card.Title>
                    <Card.Content>
                        <QuizSystem 
                            key={quiz.id}
                            questions={quiz.questions} 
                            onQuizComplete={onComplete} 
                        />
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};
