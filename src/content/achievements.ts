import type { Achievement } from '../types';

export const mockAchievements: Achievement[] = [
    {
        id: 'first-step',
        title: 'Getting Started',
        description: 'Complete your first lesson',
        type: 'complete_first_lesson',
        goal: {},
        icon: 'Star',
    },
    {
        id: 'dedicated-learner',
        title: 'Dedicated Learner',
        description: 'Complete 3 lessons',
        type: 'complete_n_lessons',
        goal: { count: 3 },
        icon: 'Award',
    },
    {
        id: 'getting-started-master',
        title: 'Getting Started Master',
        description: 'Complete all lessons in the "Getting Started" category',
        type: 'complete_category',
        goal: { category: 'Getting Started' },
        icon: 'Trophy',
    },
    {
        id: 'core-concept-master',
        title: 'Core Concept Master',
        description: 'Complete all lessons in the "Core Concepts" category',
        type: 'complete_category',
        goal: { category: 'Core Concepts' },
        icon: 'Trophy',
    },
    {
        id: 'quiz-master',
        title: 'Quiz Master',
        description: 'Score 80% or higher on any quiz',
        type: 'pass_quiz',
        goal: {},
        icon: 'Crown',
    }
];
