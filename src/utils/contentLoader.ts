/// <reference types="vite/client" />

import type { MarkdownLesson, LabviewExample, StandaloneQuiz, Achievement } from '../types';
import { mockExamples } from '../content/examples';
import { mockQuizzes } from '../content/quizzes';
import { mockAchievements } from '../content/achievements';
import { lessonMeta, LessonMeta } from '../content/lessons/lessonMeta';

// Import all MDX files as modules with default export only
const lessonModules = import.meta.glob('../content/lessons/*.mdx', { eager: true });

console.log('Loaded lesson modules:', lessonModules);


export const loadAllLessons = async (): Promise<MarkdownLesson[]> => {
  // The 'completed' flag is initially false and will be managed by the App's state
  return lessonMeta.map(meta => {
    // Match by filename
    const mod = lessonModules[`../content/lessons/${meta.id}.mdx`] as { default: React.FC } | undefined;
    if (!mod || typeof mod.default !== 'function') {
      console.warn(`No MDX component found for lesson id: ${meta.id}`);
      return null;
    }
    return {
      ...meta,
      content: mod.default,
      completed: false,
    };
  }).filter((x): x is MarkdownLesson => !!x);
};

export const loadLesson = async (id: string): Promise<MarkdownLesson> => {
  const meta = lessonMeta.find(l => l.id === id);
  if (!meta) throw new Error(`Lesson metadata with id ${id} not found`);
  const mod = lessonModules[`../content/lessons/${meta.id}.mdx`] as { default: React.FC } | undefined;
  if (!mod || typeof mod.default !== 'function') throw new Error(`No MDX component found for lesson id: ${id}`);
  return {
    ...meta,
    content: mod.default,
    completed: false,
  };
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

// Import all MDX files in the lessons directory eagerly



