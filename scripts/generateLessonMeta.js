// This script scans all .mdx files in src/content/lessons, extracts frontmatter, and generates lessonMeta.ts
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LESSONS_DIR = path.join(__dirname, '../src/content/lessons');
const META_FILE = path.join(LESSONS_DIR, 'lessonMeta.ts');

function extractFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return null;
  return yaml.load(match[1]);
}

function extractQuiz(frontmatter) {
  // Ensure quiz is always an array of objects with question/options/answer
  if (!frontmatter.quiz) return [];
  return frontmatter.quiz.map(q => ({
    question: q.question,
    options: q.options,
    answer: q.answer,
  }));
}

function main() {
  const files = fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.mdx'));
  const lessons = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8');
    const fm = extractFrontmatter(content);
    if (!fm) continue;
    lessons.push({
      id: fm.id,
      title: fm.title,
      description: fm.description,
      category: fm.category,
      difficulty: fm.difficulty,
      estimatedTime: fm.estimatedTime,
      quiz: extractQuiz(fm),
    });
  }
  const out = `// AUTO-GENERATED FILE. DO NOT EDIT.
import type { MarkdownLesson } from '../../types';

export interface LessonMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  quiz: { question: string; options: string[]; answer: string }[];
}

export const lessonMeta: LessonMeta[] = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(META_FILE, out);
  console.log(`Wrote ${lessons.length} lessons to lessonMeta.ts`);
}

main();
