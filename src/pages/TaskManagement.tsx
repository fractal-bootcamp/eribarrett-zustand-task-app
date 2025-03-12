import { useState } from 'react';
import TasksView from './TasksView';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store';
import { TabType } from '../types';

export default function TaskManagement() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('all');

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your tasks efficiently
                </p>
            </header>

            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold">Your Tasks</div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Add New Task
                </button>
            </div>

            <TasksView activeTab={activeTab} setActiveTab={setActiveTab} />

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                        <TaskForm
                            onClose={() => setIsFormOpen(false)}
                            onSubmit={(data) => {
                                useTaskStore.getState().addTask({
                                    title: data.title,
                                    description: data.description,
                                    status: data.status
                                });
                                setIsFormOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
} 