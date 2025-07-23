import type { MarkdownLesson, LabviewExample, StandaloneQuiz, Achievement } from '../types';
import { Lesson1Content, lesson1Quiz } from '../content/lesson1';
import { Lesson2Content, lesson2Quiz } from '../content/lesson2';
import { mockExamples } from '../content/examples';
import { mockQuizzes } from '../content/quizzes';
import { mockAchievements } from '../content/achievements';
import React from 'react';
import ReactMarkdown from 'react-markdown';

// In a real JAMstack app, you'd fetch and parse markdown files with frontmatter.
// We'll simulate that by importing content from TS files.
const lessonsData: Omit<MarkdownLesson, 'completed'>[] = [
  {
    id: 'labview-basics',
    title: 'Introduction to LabVIEW',
    description: 'Understand the core components of the LabVIEW environment.',
    category: 'Getting Started',
    difficulty: 'beginner',
    estimatedTime: 10,
    content: Lesson1Content,
    quiz: lesson1Quiz,
  },
  {
    id: 'data-flow',
    title: 'Understanding Data Flow',
    description: 'Learn the fundamental data flow paradigm in LabVIEW.',
    category: 'Getting Started',
    difficulty: 'beginner',
    estimatedTime: 15,
    content: Lesson2Content,
    quiz: lesson2Quiz,
  },
  {
    id: 'while-loops',
    title: 'While Loops',
    description: 'Learn how to repeat code execution using While Loops.',
    category: 'Core Concepts',
    difficulty: 'beginner',
    estimatedTime: 15,
    content: () => React.createElement(ReactMarkdown, {children: 'This is placeholder content for While Loops.'}),
    quiz: [
      {
        question: 'What does a While Loop need?',
        options: ['A stop condition', 'A counter', 'An input'],
        answer: 'A stop condition',
      },
    ],
  },
];

export const loadAllLessons = async (): Promise<MarkdownLesson[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 200));
  // The 'completed' flag is initially false and will be managed by the App's state
  return lessonsData.map(lesson => ({ ...lesson, completed: false }));
};

export const loadLesson = async (id: string): Promise<MarkdownLesson> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 100));
  const lesson = lessonsData.find(l => l.id === id);
  if (!lesson) {
    throw new Error(`Lesson with id ${id} not found`);
  }
  // The 'completed' flag is managed by App state, so we return a fresh copy here.
  return { ...lesson, completed: false };
};

export const loadAllExamples = async (): Promise<LabviewExample[]> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 200));
    return mockExamples;
};

export const loadAllQuizzes = async (): Promise<StandaloneQuiz[]> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 200));
    return mockQuizzes;
};

export const loadAllAchievements = async (): Promise<Achievement[]> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 0));
    return mockAchievements;
};
