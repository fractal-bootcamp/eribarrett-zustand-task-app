import React, { useState, useMemo } from 'react';
import TaskItem from '../components/TaskItem';
import { useTaskStore } from '../store';
import type { TabType } from '../types';

export default function Tasks() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const tasks = useTaskStore((state) => state.tasks);

    const filteredTasks = useMemo(() => {
        if (activeTab === 'all') return tasks;
        return tasks.filter(task => task.status === activeTab);
    }, [tasks, activeTab]);

    const tabs: { id: TabType; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'todo', label: 'To Do' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'done', label: 'Done' }
    ];

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View and filter your tasks
                </p>
            </header>

            <div className="flex border-b mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 ${activeTab === tab.id
                            ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                        No tasks found in this category.
                    </div>
                )}
            </div>
        </div>
    );
} 