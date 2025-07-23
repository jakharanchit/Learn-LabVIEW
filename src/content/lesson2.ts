import React from 'react';
import type { QuizQuestion } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const content = `
# Understanding Data Flow

LabVIEW follows a dataflow model for running VIs. This is different from traditional text-based languages that use a sequential, or procedural, model.

## What is Data Flow?

A block diagram node executes when it receives all required inputs. When a node executes, it produces output data and passes the data to the next node in the dataflow path. The movement of data through the nodes determines the execution order of the VIs and functions on the block diagram.

* **Nodes:** These are the objects on the block diagram like functions, structures (like loops), and other VIs.
* **Wires:** Wires connect nodes together and carry data between them. A wire can only have one data source, but it can be wired to multiple destinations.

## Visualizing Data Flow

Imagine a simple VI that adds two numbers and displays the result.

1. Two **Numeric Control** nodes on the Front Panel provide the input values.
2. On the Block Diagram, these controls are wired to an **Add** function.
3. The **Add** function cannot execute until it has received data from BOTH numeric controls.
4. Once it receives both values, it executes, adds them together, and sends the result out.
5. The output of the **Add** function is wired to a **Numeric Indicator**, which then displays the result on the Front Panel.
`;

export const Lesson2Content: React.FC = () => {
    return React.createElement(ReactMarkdown, { children: content, remarkPlugins: [remarkGfm] });
}

export const lesson2Quiz: QuizQuestion[] = [
    {
        question: "What determines the execution order of nodes in LabVIEW?",
        options: ["Their position on the diagram", "The flow of data", "The size of the node", "The order they were placed"],
        answer: "The flow of data"
    },
    {
        question: "When does a block diagram node execute?",
        options: ["Immediately", "After a delay", "When it receives all required inputs", "When the user clicks it"],
        answer: "When it receives all required inputs"
    }
];
