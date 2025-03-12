import { create } from 'zustand';

// Define Task type
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

// Define store state
interface TaskState {
    tasks: Task[];

    // Actions
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    deleteTask: (id: string) => void;
    moveTask: (id: string, newStatus: TaskStatus) => void;
}

// Create store
export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    addTask: (taskData) => set((state) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            ...taskData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return { tasks: [...state.tasks, newTask] };
    }),

    updateTask: (id, updates) => set((state) => {
        const now = new Date();
        const updatedTasks = state.tasks.map(task =>
            task.id === id
                ? { ...task, ...updates, updatedAt: now }
                : task
        );

        return { tasks: updatedTasks };
    }),

    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    })),

    moveTask: (id, newStatus) => set((state) => {
        const now = new Date();
        const updatedTasks = state.tasks.map(task =>
            task.id === id
                ? { ...task, status: newStatus, updatedAt: now }
                : task
        );

        return { tasks: updatedTasks };
    }),
}));