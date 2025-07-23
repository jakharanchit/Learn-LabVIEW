import type { StandaloneQuiz } from '../types';

export const mockQuizzes: StandaloneQuiz[] = [
    {
        id: 'fundamentals-quiz',
        title: 'LabVIEW Fundamentals',
        description: 'Test your understanding of basic LabVIEW concepts and terminology.',
        estimatedTime: 5,
        passScore: 80,
        questions: [
            { question: "What is the UI window called?", options: ["Front Panel", "Block Diagram"], answer: "Front Panel", difficulty: 'easy' },
            { question: "What is the code window called?", options: ["Front Panel", "Block Diagram"], answer: "Block Diagram", difficulty: 'easy' },
            { question: "What paradigm does LabVIEW use?", options: ["Procedural", "Dataflow"], answer: "Dataflow", difficulty: 'medium' },
        ]
    },
    {
        id: 'dataflow-quiz',
        title: 'Dataflow and Structures',
        description: 'Advanced concepts in LabVIEW dataflow programming and control structures.',
        estimatedTime: 10,
        passScore: 75,
        questions: [
            { question: "When does a For Loop stop?", options: ["After N iterations", "When a condition is met"], answer: "After N iterations", difficulty: 'easy' },
            { question: "What determines execution order?", options: ["Position", "Dataflow"], answer: "Dataflow", difficulty: 'easy' },
            { question: "What is a Shift Register used for?", options: ["Storing data between loop iterations", "Counting iterations"], answer: "Storing data between loop iterations", difficulty: 'medium' },
            { question: "What is a Case Structure's input called?", options: ["Selector terminal", "Input terminal"], answer: "Selector terminal", difficulty: 'medium' },
            { question: "How can you stop parallel loops?", options: ["With a local variable", "With a notifier"], answer: "With a notifier", difficulty: 'hard' },
        ]
    },
    {
        id: 'functions-palette-quiz',
        title: 'Functions Palette',
        description: 'Knowledge of LabVIEW\'s built-in functions and their usage.',
        estimatedTime: 8,
        passScore: 75,
        questions: [
            { question: "Where do you find the Add function?", options: ["Numeric Palette", "Boolean Palette"], answer: "Numeric Palette", difficulty: 'easy' },
            { question: "What does the 'Build Array' function do?", options: ["Creates an array from elements", "Initializes an empty array"], answer: "Creates an array from elements", difficulty: 'easy' },
            { question: "What is a Polymorphic VI?", options: ["A VI that accepts multiple data types", "A VI that changes its appearance"], answer: "A VI that accepts multiple data types", difficulty: 'medium' },
            { question: "How do you add a delay to a loop?", options: ["Wait (ms) function", "Delay VI"], answer: "Wait (ms) function", difficulty: 'medium' },
        ]
    }
];
