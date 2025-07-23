import React, { useState, useMemo, useEffect } from 'react';
import type { MarkdownLesson, UserProgress } from '../types';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { Filter, Search, BookOpen, CheckCircle2, Clock, BarChart } from 'lucide-react';

interface LessonBrowserProps {
    lessons: MarkdownLesson[];
    onLessonSelect: (lessonId: string) => void;
    userProgress: UserProgress;
}

const DifficultyIcon = ({ difficulty }: { difficulty: MarkdownLesson['difficulty'] }) => {
    switch (difficulty) {
        case 'beginner':
            return <BarChart className="h-4 w-4 text-green-500" style={{ transform: 'scaleY(0.6)'}} />;
        case 'intermediate':
            return <BarChart className="h-4 w-4 text-yellow-500" style={{ transform: 'scaleY(0.8)'}}/>;
        case 'advanced':
            return <BarChart className="h-4 w-4 text-red-500" />;
        default:
            return null;
    }
}

export const LessonBrowser: React.FC<LessonBrowserProps> = ({ lessons, onLessonSelect, userProgress }) => {
    const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lessonBrowserSearchTerm') || '');
    const [categoryFilter, setCategoryFilter] = useState(() => localStorage.getItem('lessonBrowserCategory') || 'All Categories');
    const [levelFilter, setLevelFilter] = useState(() => localStorage.getItem('lessonBrowserLevel') || 'All Levels');

    useEffect(() => {
        localStorage.setItem('lessonBrowserSearchTerm', searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('lessonBrowserCategory', categoryFilter);
    }, [categoryFilter]);

    useEffect(() => {
        localStorage.setItem('lessonBrowserLevel', levelFilter);
    }, [levelFilter]);

    const categories = useMemo(() => ['All Categories', ...Array.from(new Set(lessons.map(l => l.category)))], [lessons]);
    const levels = useMemo(() => ['All Levels', 'beginner', 'intermediate', 'advanced'], []);

    const filteredLessons = useMemo(() => {
        return lessons.filter(lesson => {
            const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All Categories' || lesson.category === categoryFilter;
            const matchesLevel = levelFilter === 'All Levels' || lesson.difficulty === levelFilter;
            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [lessons, searchTerm, categoryFilter, levelFilter]);
    
    const completedCount = useMemo(() => {
        return filteredLessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
    }, [filteredLessons, userProgress]);

    const LessonList = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredLessons.map(lesson => (
                 <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className="bg-background-card border border-border rounded-lg shadow-sm text-left hover:shadow-lg dark:hover:shadow-blue-900/20 hover:border-blue-400/50 transition-all duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-color focus-visible:ring-offset-2"
                >
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-3">
                            <Badge variant="secondary" className="capitalize">{lesson.category}</Badge>
                            {userProgress.completedLessons.includes(lesson.id) && (
                                <span className="flex-shrink-0" title="Completed">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">{lesson.title}</h3>
                        <p className="text-sm text-text-subtle mt-2">{lesson.description}</p>
                    </div>
                    <div className="border-t border-border bg-background-emphasis px-6 py-3 text-xs text-text-subtle flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 capitalize">
                            <DifficultyIcon difficulty={lesson.difficulty} />
                            {lesson.difficulty}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{lesson.estimatedTime} min</span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
    
    return (
        <div className="p-6 md:p-8 lg:p-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">LabVIEW Lessons</h1>
                <p className="text-lg text-text-subtle mt-1">Comprehensive LabVIEW programming lessons from beginner to advanced</p>
            </header>

            <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-5 w-5 text-text-subtle"/>
                    <h2 className="text-md font-semibold text-text-primary">Filters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-placeholder" />
                         <Input 
                            type="text"
                            placeholder="Search lessons..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </Select>
                     <Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                        {levels.map(level => <option key={level} value={level} className="capitalize">{level}</option>)}
                    </Select>
                </div>
            </Card>

            <div className="flex items-center justify-between mt-6 mb-4">
                <h3 className="text-lg font-semibold text-text-primary">{filteredLessons.length} Lessons</h3>
                <span className="text-sm text-text-subtle">{completedCount} of {filteredLessons.length} completed</span>
            </div>

            {filteredLessons.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border rounded-lg mt-4">
                    <BookOpen className="mx-auto h-12 w-12 text-text-placeholder" />
                    <h3 className="mt-2 text-lg font-medium text-text-primary">No lessons found</h3>
                    <p className="mt-1 text-sm text-text-subtle">Try adjusting your search terms or filters.</p>
                </div>
            ) : (
                <LessonList />
            )}
        </div>
    );
};
