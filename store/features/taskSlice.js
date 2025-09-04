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
        },
        removeTask(state, { payload }) {
            state.tasks = state.tasks.filter(t => t.id !== payload.id);
        },
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
    selectors: {
        selectTasks: (state) => state.tasks,
    }
});
export const { addTask, initTasks, removeTask, removeAllTasks, finishTask } = taskSlice.actions;
export const { selectTasks } = taskSlice.selectors;
export const tasksReducer = taskSlice.reducer;

