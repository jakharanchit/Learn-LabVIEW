import React, { useMemo } from 'react';
import type { UserProgress, MarkdownLesson, Achievement } from '../types';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import { Button } from './ui/Button';
import * as Lucide from 'lucide-react';

interface ProgressDashboardProps {
  userProgress: UserProgress;
  lessons: MarkdownLesson[];
  achievements: Achievement[];
  onReviewLesson: (lessonId: string) => void;
}

const AchievementItem: React.FC<{ ach: Achievement; progress: number; isUnlocked: boolean }> = ({ ach, progress, isUnlocked }) => {
    const Icon = Lucide[ach.icon] || Lucide.Award;
    
    return (
        <div className={`flex items-center p-3 rounded-lg transition-all ${isUnlocked ? 'bg-green-50 dark:bg-green-900/20' : 'bg-background-emphasis'}`}>
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : 'bg-gray-200 dark:bg-gray-700 text-text-secondary'}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="ml-4 flex-grow">
                <h4 className={`font-semibold ${isUnlocked ? 'text-green-900 dark:text-green-300' : 'text-text-primary'}`}>{ach.title}</h4>
                <p className="text-sm text-text-subtle">{ach.description}</p>
                {!isUnlocked && (
                    <div className="mt-1">
                        <Progress value={progress} className="h-1.5" />
                    </div>
                )}
            </div>
        </div>
    )
}

const MasteryProgressBar: React.FC<{ progress: { beginner: number, intermediate: number, advanced: number } }> = ({ progress }) => {
    const totalProgress = (progress.beginner + progress.intermediate + progress.advanced) / 3;
    const sumOfProgress = progress.beginner + progress.intermediate + progress.advanced;

    const beginnerWidth = sumOfProgress > 0 ? (progress.beginner / sumOfProgress) * totalProgress : 0;
    const intermediateWidth = sumOfProgress > 0 ? (progress.intermediate / sumOfProgress) * totalProgress : 0;
    const advancedWidth = sumOfProgress > 0 ? (progress.advanced / sumOfProgress) * totalProgress : 0;

    return (
        <div className="relative pt-6">
            <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div style={{ width: `${beginnerWidth}%` }} className="h-full bg-green-500 transition-all duration-500"></div>
                <div style={{ width: `${intermediateWidth}%` }} className="h-full bg-yellow-500 transition-all duration-500"></div>
                <div style={{ width: `${advancedWidth}%` }} className="h-full bg-red-500 transition-all duration-500"></div>
            </div>
            <div className="absolute top-0 w-full flex justify-between text-xs text-text-subtle px-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
            </div>
            <div 
                className="absolute top-0 h-full flex items-center transition-all duration-500" 
                style={{ left: `calc(${totalProgress}% - 12px)`}}
            >
                <div className="relative" title={`Overall Mastery: ${totalProgress.toFixed(0)}%`}>
                    <Lucide.Star className="h-6 w-6 text-accent fill-current" />
                </div>
            </div>
        </div>
    );
};


export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProgress, lessons, achievements, onReviewLesson }) => {
    
    const { completedLessons } = userProgress;

    const masteryProgress = useMemo(() => {
        const totalByDifficulty: Record<'beginner' | 'intermediate' | 'advanced', number> = { beginner: 0, intermediate: 0, advanced: 0 };
        const completedByDifficulty: Record<'beginner' | 'intermediate' | 'advanced', number> = { beginner: 0, intermediate: 0, advanced: 0 };
        
        lessons.forEach(l => {
            if (l.difficulty === 'beginner' || l.difficulty === 'intermediate' || l.difficulty === 'advanced') {
                totalByDifficulty[l.difficulty]++;
            }
        });
        completedLessons.forEach(id => {
            const lesson = lessons.find(l => l.id === id);
            if (lesson && (lesson.difficulty === 'beginner' || lesson.difficulty === 'intermediate' || lesson.difficulty === 'advanced')) {
                completedByDifficulty[lesson.difficulty]++;
            }
        });

        return {
            beginner: totalByDifficulty.beginner > 0 ? (completedByDifficulty.beginner / totalByDifficulty.beginner) * 100 : 0,
            intermediate: totalByDifficulty.intermediate > 0 ? (completedByDifficulty.intermediate / totalByDifficulty.intermediate) * 100 : 0,
            advanced: totalByDifficulty.advanced > 0 ? (completedByDifficulty.advanced / totalByDifficulty.advanced) * 100 : 0,
        };
    }, [completedLessons, lessons]);

    const getAchievementProgress = (ach: Achievement) => {
        if (userProgress.unlockedAchievements.includes(ach.id)) return 100;

        switch(ach.type) {
            case 'complete_first_lesson':
                return completedLessons.length > 0 ? 100 : 0;
            case 'complete_n_lessons':
                return Math.min(100, (completedLessons.length / (ach.goal.count || 1)) * 100);
            case 'complete_category': {
                const categoryLessons = lessons.filter(l => l.category === ach.goal.category);
                if (categoryLessons.length === 0) return 0;
                const completedInCategory = categoryLessons.filter(l => completedLessons.includes(l.id)).length;
                return (completedInCategory / categoryLessons.length) * 100;
            }
            case 'pass_quiz': {
                const allScores = {...userProgress.lessonQuizScores, ...userProgress.standaloneQuizScores};
                const maxScore = Object.values(allScores).reduce((max, s) => Math.max(max, (s.score/s.total) * 100), 0);
                return Math.min(100, (maxScore / 80) * 100); // 80% is the goal
            }
            default:
                return 0;
        }
    };

    const quizPerformance = useMemo(() => {
        const lessonScores = Object.values(userProgress.lessonQuizScores);
        const standaloneScores = Object.values(userProgress.standaloneQuizScores);
        const allScores = [...lessonScores, ...standaloneScores];

        if (allScores.length === 0) return null;
        
        const totalScore = allScores.reduce((sum, s) => sum + (s.score / s.total), 0);
        return {
            average: (totalScore / allScores.length) * 100,
            attempts: allScores.length,
        };
    }, [userProgress.lessonQuizScores, userProgress.standaloneQuizScores]);

    const recentlyCompleted = useMemo(() => {
        return completedLessons
            .map(id => lessons.find(l => l.id === id))
            .filter((l): l is MarkdownLesson => !!l)
            .slice(-3) // Get last 3
            .reverse();
    }, [completedLessons, lessons]);

    return (
        <div className="p-6 md:p-8 lg:p-10 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Your Progress</h1>
                <p className="text-lg text-text-subtle mt-1">Track your learning journey and achievements.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                 <Card>
                    <Card.Title><Lucide.BarChart3 className="mr-3 h-5 w-5 text-accent" />Statistics</Card.Title>
                    <Card.Content className="space-y-4">
                        <div>
                            <p className="text-sm text-text-subtle">Lessons Completed</p>
                            <p className="text-2xl font-bold">{completedLessons.length} <span className="text-lg text-text-subtle">/ {lessons.length}</span></p>
                            <Progress value={lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0} className="h-1.5 mt-1" />
                        </div>
                         <div>
                            <p className="text-sm text-text-subtle">Est. Time Spent</p>
                            <p className="text-2xl font-bold">{userProgress.totalTimeSpent} <span className="text-lg text-text-subtle">min</span></p>
                        </div>
                        <div>
                            <p className="text-sm text-text-subtle">Learning Streak</p>
                            <p className="text-2xl font-bold">{userProgress.learningStreak.count} <span className="text-lg text-text-subtle">day(s)</span></p>
                        </div>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title><Lucide.HelpCircle className="mr-3 h-5 w-5 text-accent" />Quiz Performance</Card.Title>
                    <Card.Content>
                        {quizPerformance ? (
                            <div className="flex justify-around text-center h-full items-center">
                                <div>
                                    <p className="text-sm text-text-subtle">Average Score</p>
                                    <p className="text-3xl font-bold">{quizPerformance.average.toFixed(0)}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-text-subtle">Quizzes Taken</p>
                                    <p className="text-3xl font-bold">{quizPerformance.attempts}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-text-subtle">No quizzes taken yet.</p>
                            </div>
                        )}
                    </Card.Content>
                </Card>
                 <Card>
                    <Card.Title><Lucide.History className="mr-3 h-5 w-5 text-accent" />Recently Completed</Card.Title>
                    <Card.Content>
                        {recentlyCompleted.length > 0 ? (
                            <div className="space-y-3">
                                {recentlyCompleted.map(lesson => (
                                    <div key={lesson.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-text-primary truncate" title={lesson.title}>{lesson.title}</p>
                                            <p className="text-xs text-text-subtle">{lesson.category}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => onReviewLesson(lesson.id)}>Review</Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="flex items-center justify-center h-full">
                                <p className="text-center text-text-subtle">No lessons completed yet.</p>
                            </div>
                        )}
                    </Card.Content>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <Card.Title><Lucide.Trophy className="mr-3 h-5 w-5 text-accent" />Mastery Progress</Card.Title>
                    <Card.Content>
                        <p className="text-sm text-text-subtle mb-4">Your knowledge level across different difficulties.</p>
                        <MasteryProgressBar progress={masteryProgress} />
                    </Card.Content>
                </Card>
                 <Card>
                    <Card.Title><Lucide.Award className="mr-3 h-5 w-5 text-accent" />Achievements</Card.Title>
                    <Card.Content>
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                             {achievements.map(ach => (
                                <AchievementItem 
                                    key={ach.id} 
                                    ach={ach} 
                                    isUnlocked={userProgress.unlockedAchievements.includes(ach.id)}
                                    progress={getAchievementProgress(ach)}
                                />
                            ))}
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};
