import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTaskStore, type Task } from './index';

// Helper to reset the store before each test
const resetStore = () => {
    useTaskStore.setState({ tasks: [] });
};

describe('Task Store', () => {
    beforeEach(() => {
        resetStore();
        // Reset mocks
        vi.restoreAllMocks();
    });

    it('should initialize with an empty tasks array', () => {
        const state = useTaskStore.getState();
        expect(state.tasks).toEqual([]);
    });

    it('should add a new task', () => {
        const { addTask } = useTaskStore.getState();

        addTask({
            title: 'Test Task',
            description: 'This is a test task',
            status: 'todo'
        });

        const { tasks } = useTaskStore.getState();

        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe('Test Task');
        expect(tasks[0].description).toBe('This is a test task');
        expect(tasks[0].status).toBe('todo');
        expect(tasks[0].id).toBeDefined();
        expect(tasks[0].createdAt).toBeInstanceOf(Date);
        expect(tasks[0].updatedAt).toBeInstanceOf(Date);
    });

    it('should update a task', () => {
        // Create a sequence of dates for the mock
        const dates = [
            new Date(2023, 0, 1, 10, 0), // First call - task creation (createdAt)
            new Date(2023, 0, 1, 10, 0), // Second call - task creation (updatedAt)
            new Date(2023, 0, 1, 11, 0)  // Third call - task update (updatedAt)
        ];

        let dateIndex = 0;
        vi.spyOn(global, 'Date').mockImplementation(() => {
            return dates[dateIndex++];
        });

        const { addTask, updateTask } = useTaskStore.getState();

        addTask({
            title: 'Test Task',
            description: 'This is a test task',
            status: 'todo'
        });

        const { tasks: initialTasks } = useTaskStore.getState();
        const taskId = initialTasks[0].id;

        updateTask(taskId, {
            title: 'Updated Task',
            status: 'in-progress'
        });

        const { tasks: updatedTasks } = useTaskStore.getState();

        expect(updatedTasks[0].title).toBe('Updated Task');
        expect(updatedTasks[0].description).toBe('This is a test task'); // Unchanged
        expect(updatedTasks[0].status).toBe('in-progress');

        // Compare dates
        expect(updatedTasks[0].updatedAt).not.toEqual(initialTasks[0].updatedAt);
    });

    it('should delete a task', () => {
        const { addTask, deleteTask } = useTaskStore.getState();

        addTask({
            title: 'Test Task 1',
            description: 'This is test task 1',
            status: 'todo'
        });

        addTask({
            title: 'Test Task 2',
            description: 'This is test task 2',
            status: 'todo'
        });

        const { tasks: initialTasks } = useTaskStore.getState();
        expect(initialTasks.length).toBe(2);

        const taskIdToDelete = initialTasks[0].id;
        deleteTask(taskIdToDelete);

        const { tasks: updatedTasks } = useTaskStore.getState();
        expect(updatedTasks.length).toBe(1);
        expect(updatedTasks[0].id).not.toBe(taskIdToDelete);
    });

    it('should move a task to a different status', () => {
        // Create a sequence of dates for the mock
        const dates = [
            new Date(2023, 0, 1, 10, 0), // First call - task creation (createdAt)
            new Date(2023, 0, 1, 10, 0), // Second call - task creation (updatedAt)
            new Date(2023, 0, 1, 11, 0)  // Third call - task update (updatedAt)
        ];

        let dateIndex = 0;
        vi.spyOn(global, 'Date').mockImplementation(() => {
            return dates[dateIndex++];
        });

        const { addTask, moveTask } = useTaskStore.getState();

        addTask({
            title: 'Test Task',
            description: 'This is a test task',
            status: 'todo'
        });

        const { tasks: initialTasks } = useTaskStore.getState();
        const taskId = initialTasks[0].id;

        moveTask(taskId, 'done');

        const { tasks: updatedTasks } = useTaskStore.getState();

        expect(updatedTasks[0].status).toBe('done');

        // Compare dates
        expect(updatedTasks[0].updatedAt).not.toEqual(initialTasks[0].updatedAt);
    });
}); 