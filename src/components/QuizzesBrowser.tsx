import React, { useMemo } from 'react';
import type { StandaloneQuiz } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
//import { HelpCircle, Clock, Percent, Hash, PlayCircle } from 'lucide-react';

interface QuizzesBrowserProps {
  quizzes: StandaloneQuiz[];
  onStartQuiz: (quizId: string) => void;
}

const QuizCard: React.FC<{ quiz: StandaloneQuiz; onStartQuiz: (quizId: string) => void }> = ({ quiz, onStartQuiz }) => {
    const difficultyBreakdown = useMemo(() => {
        const breakdown = { easy: 0, medium: 0, hard: 0 };
        quiz.questions.forEach(q => {
            breakdown[q.difficulty] = (breakdown[q.difficulty] || 0) + 1;
        });
        return breakdown;
    }, [quiz.questions]);

    return (
        <Card className="p-0 flex flex-col h-full hover:shadow-lg dark:hover:shadow-blue-900/20 hover:border-blue-400/50 transition-all duration-200">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-text-primary mb-2">{quiz.title}</h3>
                <p className="text-sm text-text-subtle mb-6">{quiz.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary mb-6">
                    <div className="flex items-center gap-2" title="Total Questions">
                        <Hash className="h-4 w-4 text-text-subtle" />
                        <span>{quiz.questions.length} questions</span>
                    </div>
                     <div className="flex items-center gap-2" title="Estimated Time">
                        <Clock className="h-4 w-4 text-text-subtle" />
                        <span>{quiz.estimatedTime} minutes</span>
                    </div>
                     <div className="flex items-center gap-2" title="Passing Score">
                        <Percent className="h-4 w-4 text-text-subtle" />
                        <span>Pass: {quiz.passScore}%</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {difficultyBreakdown.easy > 0 && <Badge variant="green">{difficultyBreakdown.easy} easy</Badge>}
                    {difficultyBreakdown.medium > 0 && <Badge variant="yellow">{difficultyBreakdown.medium} medium</Badge>}
                    {difficultyBreakdown.hard > 0 && <Badge variant="hard">{difficultyBreakdown.hard} hard</Badge>}
                </div>
            </div>
             <div className="border-t border-border bg-background-emphasis p-4 mt-auto">
                <Button size="sm" className="w-full" onClick={() => onStartQuiz(quiz.id)}>
                    <PlayCircle className="mr-2 h-4 w-4"/>
                    Start Quiz
                </Button>
            </div>
        </Card>
    );
};


export const QuizzesBrowser: React.FC<QuizzesBrowserProps> = ({ quizzes, onStartQuiz }) => {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">LabVIEW Knowledge Assessments</h1>
        <p className="text-lg text-text-subtle mt-1">Test your LabVIEW knowledge with questions based on NI's official documentation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onStartQuiz={onStartQuiz} />
        ))}
      </div>
    </div>
  );
};
