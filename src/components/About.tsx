import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Zap, Cpu, Code } from 'lucide-react';

const technologies = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "Lucide Icons",
];

export const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">About the LabVIEW Learning Hub</h1>
                <p className="text-lg text-text-subtle mt-1">An interactive learning platform.</p>
            </header>

            <div className="space-y-8">
                <Card>
                    <Card.Title>
                        <Zap className="mr-3 h-5 w-5 text-accent" />
                        Our Mission
                    </Card.Title>
                    <Card.Content>
                        <p className="text-text-secondary leading-relaxed">
                            The LabVIEW Learning Hub was created to provide a modern, engaging, and effective way for engineers, students, and enthusiasts to learn NI LabVIEW. Traditional documentation can be dense and difficult to navigate. We aim to break down complex topics into digestible, interactive lessons, supplemented with practical examples and immediate feedback through quizzes.
                        </p>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Title>
                        <Cpu className="mr-3 h-5 w-5 text-accent" />
                        Technology Stack
                    </Card.Title>
                    <Card.Content>
                        <p className="text-text-secondary mb-4">
                            This application is built with a modern, component-based frontend stack.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map(tech => (
                                <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
                            ))}
                        </div>
                    </Card.Content>
                </Card>

                 <Card>
                    <Card.Title>
                        <Code className="mr-3 h-5 w-5 text-accent" />
                        About the Code
                    </Card.Title>
                    <Card.Content>
                        <p className="text-text-secondary leading-relaxed">
                           This application is a client-side single-page app (SPA) built with React and Vite. It's designed to be run in a containerized environment like GitHub Codespaces, ensuring a consistent and reproducible setup. Content is loaded from TypeScript modules to simulate a content management system.
                        </p>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};
