import { createAsyncThunk, createSlice, rejectedWithValue } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";

export const initTasks = createAsyncThunk('tasks/fetch', async () => {
    return await taskService.getTasks();
});

export const addTask = createAsyncThunk('tasks/add', async (payload) => {
    return await taskService.addTask(payload);
});

export const removeTask = createAsyncThunk('tasks/remove', async (payload) => {
    const response = await taskService.removeTask(payload);
    return response;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        error: null,
        loading: false,
    },
    reducers: {
        removeAllTasks(state) { state.tasks = []; },
        finishTask(state, { payload }) {
            const taskToBeDone = { ...payload };
            taskToBeDone.done = !taskToBeDone.done;
            if (taskToBeDone.done) {
                taskToBeDone.completedDate = new Date();
            } else {
                delete taskToBeDone.completedDate;
            }
            state.tasks = state.tasks.map((t) => {
                return t.id === taskToBeDone.id
                    ? taskToBeDone
                    : t;
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(initTasks.rejected, (state, { payload }) => {
                state.error = 'Erro ao carregar lista de tarefas';
                state.loading = false;
                state.tasks = [];
                console.error(payload);
                // state.tasks = []; opcional
            })
            .addCase(initTasks.pending, (state) => {
                state.loading = true;
                state.tasks = [];
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, { payload }) => {
                state.tasks.push(payload);
            })
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter(t => t.id !== payload.id);
                state.error = null;
                state.loading = false;
            })
            .addCase(removeTask.rejected, (state) => {
                state.error = 'Erro ao remover tarefa ';
                state.loading = false;
            });
    },
    selectors: {
        selectTasks: (state) => state.tasks,
        selectError: (state) => state.error,
        selectLoading: (state) => state.loading,
    }
});
export const { removeAllTasks, finishTask } = taskSlice.actions;
export const { selectTasks, selectError, selectLoading } = taskSlice.selectors;
export const tasksReducer = taskSlice.reducer;

