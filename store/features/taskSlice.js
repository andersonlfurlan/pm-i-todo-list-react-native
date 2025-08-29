import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        addTask(state, { payload }) {
            payload.id = new Date().toISOString();
            payload.createdDate = new Date();
            state.tasks.push(payload);
        },
        initTasks(state, { payload }) {
            state = payload;
        }
    },
    selectors: {
        selectTasks: (state) => state.tasks,
    }
});
export const { addTask, initTasks } = taskSlice.actions;
export const { selectTasks } = taskSlice.selectors;
export const tasksReducer = taskSlice.reducer;

