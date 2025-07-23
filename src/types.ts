// --- Main Application Types ---

import React from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  // The correct answer is one of the strings in `options`
  answer: string;
}

export interface GradedQuizQuestion extends QuizQuestion {
  difficulty: 'easy' | 'medium' | 'hard';
}

// Main lesson type used throughout the app, loaded from content files
export interface MarkdownLesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  completed: boolean;
  content: React.FC; // MDX content is rendered as a component
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: string[];
  currentLesson: string | null;
  lessonQuizScores: Record<string, { score: number; total: number; date: string }>;
  standaloneQuizScores: Record<string, { score: number; total: number; date: string }>;
  totalTimeSpent: number; // in minutes
  unlockedAchievements: string[];
  learningStreak: {
    count: number;
    lastActivityDate: string; // ISO date string
  };
}

export interface LabviewExample {
  id: string;
  title: string;
  description: string;
  type: 'example' | 'guide';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  keyConcepts: string[];
  implementationPoints: string[];
  wikiLink: string;
  category: string;
}

export interface StandaloneQuiz {
  id: string;
  title: string;
  description:string;
  questions: GradedQuizQuestion[];
  estimatedTime: number;
  passScore: number; // percentage
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'complete_n_lessons' | 'complete_category' | 'complete_first_lesson' | 'pass_quiz';
  goal: {
    count?: number; // for complete_n_lessons
    category?: string; // for complete_category
  };
  icon: 'Award' | 'Trophy' | 'Star' | 'Crown'; // Lucide icon names
}
