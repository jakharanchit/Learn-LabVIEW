import type { LabviewExample } from '../types';

export const mockExamples: LabviewExample[] = [
    {
        id: 'simple-addition',
        title: 'Simple Addition VI',
        description: 'Basic arithmetic operation demonstrating fundamental LabVIEW concepts',
        type: 'example',
        difficulty: 'beginner',
        category: 'Basic Programming',
        tags: ['Basic Programming', 'Front Panel Controls', 'Block Diagram'],
        keyConcepts: ['Front Panel Controls', 'Block Diagram', 'Numeric Functions', 'Data Flow'],
        implementationPoints: [
            'Two numeric controls on front panel for input values',
            'Add function from Numeric palette on block diagram',
            'Numeric indicator to display result',
        ],
        wikiLink: 'https://www.labviewwiki.org/Simple_Addition'
    },
    {
        id: 'for-loop-array',
        title: 'For Loop with Array Processing',
        description: 'Using For Loops with auto-indexing to process array elements',
        type: 'example',
        difficulty: 'intermediate',
        category: 'Loops and Arrays',
        tags: ['For Loop', 'Auto-indexing'],
        keyConcepts: ['For Loop', 'Auto-indexing', 'Arrays', 'Iteration Terminal'],
        implementationPoints: [
            'For Loop executes N times where N is determined by array size',
            'Auto-indexing tunnel extracts individual elements from input array',
            'Iteration terminal (i) provides current loop iteration (0-based)',
        ],
        wikiLink: 'https://www.labviewwiki.org/For_Loop'
    },
    {
        id: 'case-structure',
        title: 'Case Structure with Boolean Input',
        description: 'Conditional execution using Case Structure with Boolean selector',
        type: 'example',
        difficulty: 'intermediate',
        category: 'Structures',
        tags: ['Case Structure', 'Boolean Logic'],
        keyConcepts: ['Case Structure', 'Selector Terminal', 'Boolean Data Type', 'Subdiagrams'],
        implementationPoints: [
            'Boolean control on front panel connected to selector terminal',
            'TRUE case executes when control is TRUE',
            'FALSE case executes when control is FALSE',
        ],
        wikiLink: 'https://www.labviewwiki.org/Case_Structure'
    },
    {
        id: 'while-loop-stop',
        title: 'While Loop with Stop Button',
        description: 'Continuous execution with user-controlled termination',
        type: 'example',
        difficulty: 'beginner',
        category: 'Loops and Arrays',
        tags: ['While Loop', 'Stop Condition'],
        keyConcepts: ['While Loop', 'Conditional Terminal', 'Boolean Controls', 'Timing'],
        implementationPoints: [
            'While Loop continues executing until Conditional Terminal receives TRUE',
            'Stop button on Front Panel provides the boolean value',
            'A Wait function is often included to prevent high CPU usage',
        ],
        wikiLink: 'https://www.labviewwiki.org/While_Loop'
    },
    {
        id: 'style-guide',
        title: 'Block Diagram Best Practices',
        description: 'Learn how to write clean, readable, and maintainable LabVIEW code.',
        type: 'guide',
        difficulty: 'intermediate',
        category: 'Best Practices',
        tags: ['Code Style', 'Readability'],
        keyConcepts: ['Left-to-Right Data Flow', 'Wire-Bending', 'Commenting', 'SubVIs'],
        implementationPoints: [
            'Organize code to flow from left to right.',
            'Avoid wiring underneath structures or other objects.',
            'Use comments (free labels) to explain complex code sections.',
            'Group related code into SubVIs to manage complexity.'
        ],
        wikiLink: 'https://www.labviewwiki.org/Style_Guide'
    }
];
