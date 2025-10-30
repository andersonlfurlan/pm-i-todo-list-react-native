import { createAsyncThunk, createSlice, rejectedWithValue } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";

export const initTasks = createAsyncThunk('tasks/fetch', async () => {
    return await taskService.getTasks();
});

export const addTask = createAsyncThunk('tasks/add', async (payload) => {
    return await taskService.addTask(payload);
});

export const removeTask = createAsyncThunk('tasks/remove', async (payload, thunkAPI) => {
    try {
        const response = await taskService.removeTask(payload);
        return response;
    } catch (error) {
        return thunkAPI.rejectedWithValue({ payload: 'Error' });
    }
});

export const finishTask = createAsyncThunk('tasks/finish', async (payload) => {
    return await taskService.finishTask({ ...payload });
})


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        error: {
            list: null,
            register: null
        },
        loading: false,
    },
    reducers: {
        removeAllTasks(state) { state.tasks = []; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload;
                state.loading = false;
                state.error.list = null;
            })
            .addCase(initTasks.rejected, (state, { payload }) => {
                state.error.list = 'Erro ao carregar lista de tarefas';
                state.loading = false;
                state.tasks = [];
                console.error(payload);
                // state.tasks = []; opcional
            })
            .addCase(initTasks.pending, (state) => {
                state.loading = true;
                state.tasks = [];
                state.error.list = null;
            })
            .addCase(addTask.pending, (state) => {
                state.error.register = null;
            })
            .addCase(addTask.rejected, (state,) => {
                state.error.register = 'Erro ao salvar a tarefa';
            })
            .addCase(addTask.fulfilled, (state, { payload }) => {
                state.tasks.push(payload);
                state.error.register = null;
            })
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter(t => t.id !== payload.id);
                state.error.list = null;
                state.loading = false;
            })
            .addCase(removeTask.rejected, (state, payload, rejectValue) => {
                state.error.list = 'Erro ao remover tarefa ';
                state.loading = false;
            })
            .addCase(finishTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.map((t) => {
                    return (t.id === payload.id) ? payload : t;
                })
            });
    },
    selectors: {
        selectTasks: (state) => state.tasks,
        selectError: (state) => state.error,
        selectLoading: (state) => state.loading,
    }
});
export const { removeAllTasks } = taskSlice.actions;
export const { selectTasks, selectError, selectLoading } = taskSlice.selectors;
export const tasksReducer = taskSlice.reducer;

