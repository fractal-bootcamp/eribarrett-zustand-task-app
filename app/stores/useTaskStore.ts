import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'todo' | 'in-progress' | 'complete';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    labels: string[];
}

interface TaskState {
    tasks: Task[];
    activeTaskId: string | null;

    // actions
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (id: string, task: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    setActiveTask: (id: string | null) => void;

    // filters
    statusFilter: TaskStatus | 'all';
    setStatusFilter: (status: TaskStatus | 'all') => void;
    priorityFilter: TaskPriority | 'all';
    setPriorityFilter: (priority: TaskPriority | 'all') => void;
    labelFilter: string[];
    setLabelFilter: (labels: string[]) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            activeTaskId: null,

            // actions
            addTask: (taskData) => set((state) => {
                const newTask: Task = {
                    id: crypto.randomUUID(),
                    ...taskData,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                return {
                    tasks: [...state.tasks, newTask],
                }
            }),

            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updates, updatedAt: new Date() }
                        : task
                )
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
            })),

            setActiveTask: (id) => set({ activeTaskId: id }),

            // filters
            statusFilter: 'all',
            setStatusFilter: (status) => set({ statusFilter: status }),
            priorityFilter: 'all',
            setPriorityFilter: (priority) => set({ priorityFilter: priority }),
            labelFilter: [],
            setLabelFilter: (labels) => set({ labelFilter: labels }),
        }),
        {
            name: 'task-storage',
        }
    )
)
