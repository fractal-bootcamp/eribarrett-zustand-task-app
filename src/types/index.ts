// Re-export types from store for convenience
export * from '../store';

// Additional types can be defined here
export type TabType = 'todo' | 'in-progress' | 'done' | 'all';

export interface FormData {
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
} 