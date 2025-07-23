import React from 'react';
import type { QuizQuestion } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const content = `
# Welcome to LabVIEW!

This lesson introduces you to the fundamental components of the LabVIEW environment. LabVIEW (Laboratory Virtual Instrument Engineering Workbench) is a graphical programming language that uses icons instead of lines of text to create applications.

## The Two Main Windows

Every LabVIEW program, called a Virtual Instrument (VI), has two windows:

* **Front Panel:** This is the user interface of the VI. You build it with controls (inputs) and indicators (outputs). Think of it as the outside of an instrument.
* **Block Diagram:** This is where you write the program's code. You add functions and structures and connect them with wires to control the flow of data.

## The Controls and Functions Palettes

You'll use palettes to build your VIs.

* The **Controls Palette** is available on the Front Panel and contains the controls and indicators you use to create the user interface.
* The **Functions Palette** is available on the Block Diagram and contains the VIs, functions, and structures you use to build the VI's code.
`;

export const Lesson1Content: React.FC = () => {
    return React.createElement(ReactMarkdown, { children: content, remarkPlugins: [remarkGfm] });
}

export const lesson1Quiz: QuizQuestion[] = [
    {
        question: "What is the user interface window in a LabVIEW VI called?",
        options: ["Block Diagram", "Front Panel", "Control Palette", "VI Manager"],
        answer: "Front Panel"
    },
    {
        question: "Where do you write the graphical code for a VI?",
        options: ["Front Panel", "Project Explorer", "Block Diagram", "Functions Palette"],
        answer: "Block Diagram"
    },
    {
        question: "Which palette contains items for the user interface?",
        options: ["Controls Palette", "Functions Palette", "Tools Palette"],
        answer: "Controls Palette"
    }
];
