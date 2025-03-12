// Re-export types from store for convenience
import { Task, TaskStatus } from './store';

export type { Task, TaskStatus };

// Additional types
export type TabType = 'todo' | 'in-progress' | 'done' | 'all';

export interface FormData {
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
}

declare module '*.svg' {
    const content: string;
    export default content;
} 