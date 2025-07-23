import React, { useState, useMemo, useEffect } from 'react';
import type { LabviewExample } from '../types';
import { Card } from './ui/Card';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tabs } from './ui/Tabs';
import { BookCopy, ExternalLink, Tag, Lightbulb, ListChecks } from 'lucide-react';

interface ExamplesBrowserProps {
  examples: LabviewExample[];
}

const difficultyVariantMap: Record<LabviewExample['difficulty'], 'green' | 'yellow' | 'red'> = {
    beginner: 'green',
    intermediate: 'yellow',
    advanced: 'red',
};

const ExampleCard: React.FC<{ item: LabviewExample }> = ({ item }) => (
    <Card className="p-0 flex flex-col h-full hover:shadow-lg dark:hover:shadow-blue-900/20 hover:border-blue-400/50 transition-all duration-200">
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-text-primary pr-4">{item.title}</h3>
                <Badge variant={difficultyVariantMap[item.difficulty]}>{item.difficulty}</Badge>
            </div>
            <p className="text-sm text-text-subtle mb-5">{item.description}</p>
            
            <div className="mb-5">
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                   <Tag className="h-4 w-4" />
                   <span>Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </div>

            <div className="mb-5">
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                   <Lightbulb className="h-4 w-4" />
                   <span>Key Concepts</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {item.keyConcepts.map(concept => <Badge key={concept} variant="outline">{concept}</Badge>)}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                   <ListChecks className="h-4 w-4" />
                   <span>Implementation Points</span>
                </div>
                <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
                    {item.implementationPoints.map(point => <li key={point}>{point}</li>)}
                </ul>
            </div>

        </div>
        <div className="border-t border-border bg-background-emphasis p-4 mt-auto">
             <a href={item.wikiLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4"/>
                    View on LabVIEW Wiki
                </Button>
            </a>
        </div>
    </Card>
);

export const ExamplesBrowser: React.FC<ExamplesBrowserProps> = ({ examples }) => {
    const [activeTab, setActiveTab] = useState<'example' | 'guide'>(() => (localStorage.getItem('examplesBrowserTab') as 'example' | 'guide') || 'example');
    const [categoryFilter, setCategoryFilter] = useState(() => localStorage.getItem('examplesBrowserCategory') || 'All Categories');

    useEffect(() => {
        localStorage.setItem('examplesBrowserTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('examplesBrowserCategory', categoryFilter);
    }, [categoryFilter]);

    const categories = useMemo(() => ['All Categories', ...Array.from(new Set(examples.map(ex => ex.category)))], [examples]);

    const filteredExamples = useMemo(() => {
        const byType = examples.filter(ex => ex.type === activeTab);
        if (categoryFilter === 'All Categories') return byType;
        return byType.filter(ex => ex.category === categoryFilter);
    }, [examples, activeTab, categoryFilter]);
    
    return (
        <div className="p-6 md:p-8 lg:p-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">LabVIEW Examples & References</h1>
                <p className="text-lg text-text-subtle mt-1">Learn from practical examples and comprehensive references based on LabVIEW Wiki</p>
            </header>

            <Card className="p-4 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <BookCopy className="h-5 w-5 text-text-subtle"/>
                    <h2 className="text-md font-semibold text-text-primary">Browse Content</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-grow">
                        <label htmlFor="category-select" className="sr-only">Category</label>
                        <Select id="category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Select>
                    </div>
                    <a href="https://www.labviewwiki.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-accent hover:underline font-medium">
                        <ExternalLink className="h-4 w-4" />
                        Links to LabVIEW Wiki for detailed information
                    </a>
                </div>
            </Card>

            <Tabs 
                defaultTab={activeTab}
                onTabChange={(val) => setActiveTab(val as 'example' | 'guide')}
                tabs={[
                    {label: 'Programming Examples', value: 'example'},
                    {label: 'References & Guides', value: 'guide'},
                ]}
            >
                <Tabs.Content value="example">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredExamples.map(ex => <ExampleCard key={ex.id} item={ex} />)}
                    </div>
                </Tabs.Content>
                <Tabs.Content value="guide">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredExamples.map(ex => <ExampleCard key={ex.id} item={ex} />)}
                    </div>
                </Tabs.Content>
            </Tabs>
        </div>
    );
};
