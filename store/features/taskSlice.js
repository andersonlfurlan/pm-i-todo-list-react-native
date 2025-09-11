import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";
// Thunks assíncronos
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    return await taskService.getTasks();
});

export const addTaskAsync = createAsyncThunk("tasks/addTaskAsync", async (task) => {
    return await taskService.addTask(task);
});

export const removeTaskAsync = createAsyncThunk("tasks/removeTaskAsync", async (task) => {
    await taskService.removeTask(task);
    return task.id;
});

export const finishTaskAsync = createAsyncThunk("tasks/finishTaskAsync", async (task) => {
    return await taskService.finishTask(task);
});

export const clearAllTasksAsync = createAsyncThunk("tasks/clearAllTasksAsync", async () => {
    await taskService.clearTasks();
})

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    selectors: {
        selectTasks: (state) => state.tasks,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.tasks = payload;
            })
            .addCase(fetchTasks.rejected, (state, { error }) => {
                state.loading = false;
                state.error = 'Erro ao listar tarefas';
                console.error('Fetch tasks failed: ', error);
            })
            .addCase(addTaskAsync.fulfilled, (state, { payload }) => {
                state.tasks.push(payload);
            })
            .addCase(removeTaskAsync.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter((t) => t.id !== payload);
            })
            .addCase(finishTaskAsync.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.map((t) => (t.id === payload.id ? payload : t));
            })
            .addCase(clearAllTasksAsync.fulfilled, (state) => {
                state.tasks = [];
            });
    },
});
export const tasksReducer = taskSlice.reducer;
export const { selectTasks, selectLoading, selectError } = taskSlice.selectors;

