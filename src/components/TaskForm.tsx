import { useState } from 'react';
import type { FormData } from '../types';

interface TaskFormProps {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    initialData?: FormData;
}

export default function TaskForm({ onClose, onSubmit, initialData }: TaskFormProps) {
    const [formData, setFormData] = useState<FormData>(
        initialData || {
            title: '',
            description: '',
            status: 'todo'
        }
    );

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700`}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700`}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
} 