import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTaskStore, type Task, type TaskStatus } from './index';

// Mock crypto.randomUUID to return predictable IDs
const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
vi.stubGlobal('crypto', {
    randomUUID: () => mockUUID
});

// Mock Date to return predictable timestamps
const mockDate = new Date('2023-01-01T12:00:00Z');
vi.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);

describe('Task Store', () => {
    // Reset the store before each test
    beforeEach(() => {
        useTaskStore.setState({ tasks: [] });
    });

    describe('addTask', () => {
        it('should add a new task with the correct properties', () => {
            // Arrange
            const taskData = {
                title: 'Test Task',
                description: 'This is a test task',
                status: 'todo' as TaskStatus
            };

            // Act
            useTaskStore.getState().addTask(taskData);
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
            expect(tasks[0]).toEqual({
                id: mockUUID,
                title: 'Test Task',
                description: 'This is a test task',
                status: 'todo',
                createdAt: mockDate,
                updatedAt: mockDate
            });
        });
    });

    describe('updateTask', () => {
        it('should update an existing task', () => {
            // Arrange
            const initialTask = {
                title: 'Initial Task',
                description: 'Initial description',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(initialTask);

            const updates = {
                title: 'Updated Task',
                description: 'Updated description'
            };

            // Act
            useTaskStore.getState().updateTask(mockUUID, updates);
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
            expect(tasks[0].title).toBe('Updated Task');
            expect(tasks[0].description).toBe('Updated description');
            expect(tasks[0].status).toBe('todo'); // Status should remain unchanged
            expect(tasks[0].updatedAt).toBe(mockDate);
        });

        it('should not update tasks with non-matching IDs', () => {
            // Arrange
            const initialTask = {
                title: 'Initial Task',
                description: 'Initial description',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(initialTask);

            const updates = {
                title: 'Updated Task',
                description: 'Updated description'
            };

            // Act
            useTaskStore.getState().updateTask('non-existent-id', updates);
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
            expect(tasks[0].title).toBe('Initial Task');
            expect(tasks[0].description).toBe('Initial description');
        });
    });

    describe('deleteTask', () => {
        it('should delete a task with the matching ID', () => {
            // Arrange
            const task = {
                title: 'Task to Delete',
                description: 'This task will be deleted',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(task);

            // Act
            useTaskStore.getState().deleteTask(mockUUID);
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(0);
        });

        it('should not delete tasks with non-matching IDs', () => {
            // Arrange
            const task = {
                title: 'Task to Keep',
                description: 'This task should remain',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(task);

            // Act
            useTaskStore.getState().deleteTask('non-existent-id');
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
        });
    });

    describe('moveTask', () => {
        it('should update the status of a task with the matching ID', () => {
            // Arrange
            const task = {
                title: 'Task to Move',
                description: 'This task will be moved',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(task);

            // Act
            useTaskStore.getState().moveTask(mockUUID, 'in-progress');
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
            expect(tasks[0].status).toBe('in-progress');
            expect(tasks[0].updatedAt).toBe(mockDate);
        });

        it('should not update the status of tasks with non-matching IDs', () => {
            // Arrange
            const task = {
                title: 'Task to Keep',
                description: 'This task should remain in the same status',
                status: 'todo' as TaskStatus
            };
            useTaskStore.getState().addTask(task);

            // Act
            useTaskStore.getState().moveTask('non-existent-id', 'in-progress');
            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(1);
            expect(tasks[0].status).toBe('todo');
        });
    });

    describe('multiple tasks', () => {
        it('should handle multiple tasks correctly', () => {
            // Arrange
            const mockUUIDs = [
                '123e4567-e89b-12d3-a456-426614174000',
                '223e4567-e89b-12d3-a456-426614174001',
                '323e4567-e89b-12d3-a456-426614174002'
            ];

            let uuidIndex = 0;
            vi.stubGlobal('crypto', {
                randomUUID: () => mockUUIDs[uuidIndex++]
            });

            // Act
            useTaskStore.getState().addTask({
                title: 'Task 1',
                description: 'Description 1',
                status: 'todo' as TaskStatus
            });

            useTaskStore.getState().addTask({
                title: 'Task 2',
                description: 'Description 2',
                status: 'in-progress' as TaskStatus
            });

            useTaskStore.getState().addTask({
                title: 'Task 3',
                description: 'Description 3',
                status: 'done' as TaskStatus
            });

            // Update one task
            useTaskStore.getState().updateTask(mockUUIDs[1], { title: 'Updated Task 2' });

            // Delete one task
            useTaskStore.getState().deleteTask(mockUUIDs[0]);

            // Move one task
            useTaskStore.getState().moveTask(mockUUIDs[2], 'in-progress');

            const tasks = useTaskStore.getState().tasks;

            // Assert
            expect(tasks).toHaveLength(2);

            // Task 1 should be deleted
            expect(tasks.find(t => t.id === mockUUIDs[0])).toBeUndefined();

            // Task 2 should be updated
            const task2 = tasks.find(t => t.id === mockUUIDs[1]);
            expect(task2).toBeDefined();
            expect(task2?.title).toBe('Updated Task 2');
            expect(task2?.status).toBe('in-progress');

            // Task 3 should be moved
            const task3 = tasks.find(t => t.id === mockUUIDs[2]);
            expect(task3).toBeDefined();
            expect(task3?.status).toBe('in-progress');
        });
    });
}); 