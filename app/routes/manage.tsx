import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store';
import type { FormData } from '../types';

export default function Manage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const tasks = useTaskStore((state) => state.tasks);
    const { addTask, deleteTask } = useTaskStore();

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your tasks efficiently
                </p>
            </header>

            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold">Task Management</div>
                <div className="space-x-4">
                    <Link
                        to="/tasks"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        View Tasks
                    </Link>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Add New Task
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Task Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                        <h3 className="font-medium text-yellow-800 dark:text-yellow-200">To Do</h3>
                        <p className="text-2xl font-bold mt-2">
                            {tasks.filter(t => t.status === 'todo').length}
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h3 className="font-medium text-blue-800 dark:text-blue-200">In Progress</h3>
                        <p className="text-2xl font-bold mt-2">
                            {tasks.filter(t => t.status === 'in-progress').length}
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                        <h3 className="font-medium text-green-800 dark:text-green-200">Done</h3>
                        <p className="text-2xl font-bold mt-2">
                            {tasks.filter(t => t.status === 'done').length}
                        </p>
                    </div>
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                        <TaskForm
                            onClose={() => setIsFormOpen(false)}
                            onSubmit={(data: FormData) => {
                                addTask({
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