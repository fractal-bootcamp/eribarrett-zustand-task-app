import { useState } from 'react';
import { useTaskStore, Task } from '../store';

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { updateTask, deleteTask, moveTask } = useTaskStore();

    const statusColors = {
        'todo': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
        'done': 'bg-green-100 text-green-800 border-green-200'
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        moveTask(task.id, 'todo');
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    disabled={task.status === 'todo'}
                                >
                                    Move to To Do
                                </button>
                                <button
                                    onClick={() => {
                                        moveTask(task.id, 'in-progress');
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    disabled={task.status === 'in-progress'}
                                >
                                    Move to In Progress
                                </button>
                                <button
                                    onClick={() => {
                                        moveTask(task.id, 'done');
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    disabled={task.status === 'done'}
                                >
                                    Mark as Done
                                </button>
                                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                <button
                                    onClick={() => {
                                        deleteTask(task.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-2">
                {task.description}
            </p>

            <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
                    {task.status === 'todo' ? 'To Do' :
                        task.status === 'in-progress' ? 'In Progress' : 'Done'}
                </span>
                <span className="text-xs text-gray-500">
                    {formatDate(task.updatedAt)}
                </span>
            </div>
        </div>
    );
} 