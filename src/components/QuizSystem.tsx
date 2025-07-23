import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { Button } from './ui/Button';

interface QuizSystemProps {
    questions: QuizQuestion[];
    onQuizComplete: (result: { score: number; total: number }) => void;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ questions, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    if (!questions || questions.length === 0) {
        return <p className="text-text-subtle">No quiz available for this lesson.</p>;
    }

    const handleAnswerSelect = (option: string) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        return questions.reduce((score, question, index) => {
            return selectedAnswers[index] === question.answer ? score + 1 : score;
        }, 0);
    };

    const score = calculateScore();
    const isPass = score / questions.length >= 0.66; // Require at least 2/3 correct

    if (showResults) {
        return (
            <div className="p-6 bg-background-emphasis rounded-lg text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-2 text-text-primary">Quiz Results</h3>
                <p className={`text-4xl font-bold mb-4 ${isPass ? 'text-text-success' : 'text-text-danger'}`}>
                    {score} / {questions.length}
                </p>
                <p className="mb-6 text-text-secondary">{isPass ? "Great job! You've passed the quiz." : "You can do better! Review the lesson and try again."}</p>
                {isPass && (
                    <Button onClick={() => onQuizComplete({ score, total: questions.length })}>
                        Mark Lesson as Complete
                    </Button>
                )}
            </div>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = selectedAnswers[currentQuestionIndex];

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm text-text-subtle mb-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <h4 className="text-lg font-semibold text-text-primary">{currentQuestion.question}</h4>
            </div>
            <div className="space-y-3">
                {currentQuestion.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-3 rounded-md border-2 transition-all text-text-secondary font-medium
                            ${selectedOption === option 
                                ? 'bg-background-active border-border-active' 
                                : 'bg-background-card border-border-input hover:bg-background-hover hover:border-border'}
                        `}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="flex justify-end pt-4">
                <Button onClick={handleNext} disabled={!selectedOption}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            </div>
        </div>
    );
};
