import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Library, LayoutGrid, Brain, BarChart3, ArrowRight } from 'lucide-react';

interface HomeProps {
    onStart: () => void;
}

const features = [
    {
        icon: Library,
        title: 'Interactive Lessons',
        description: 'Step-by-step lessons from beginner to advanced topics.',
    },
    {
        icon: LayoutGrid,
        title: 'Practical Examples',
        description: 'Explore real-world examples and guides based on the LabVIEW Wiki.',
    },
    {
        icon: Brain,
        title: 'Knowledge Quizzes',
        description: 'Test your understanding with interactive quizzes and assessments.',
    },
    {
        icon: BarChart3,
        title: 'Progress Tracking',
        description: 'Monitor your learning journey and earn achievements along the way.',
    },
];

export const Home: React.FC<HomeProps> = ({ onStart }) => {
    return (
        <div className="flex-1 animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary">
                    Welcome to the <span className="text-text-accent">LabVIEW Learning Hub</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-text-subtle">
                    Your comprehensive guide to mastering graphical programming with NI LabVIEW. Learn at your own pace with dynamic lessons, visual examples, and interactive quizzes.
                </p>
                <div className="mt-8">
                    <Button size="lg" onClick={onStart}>
                        Start Learning Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center p-8">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background-active">
                                <feature.icon className="h-6 w-6 text-text-accent" aria-hidden="true" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-text-primary">{feature.title}</h3>
                            <p className="mt-2 text-sm text-text-subtle">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
