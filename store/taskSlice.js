import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
    finishTask: (state, action) => {
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, done: !task.done, completedDate: new Date() }
          : task
      );
    },
    clearTasks: () => {
      return [];
    },
    setTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, removeTask, finishTask, clearTasks, setTasks } =
  taskSlice.actions;

export default taskSlice.reducer;

export const useTasksSelector = () => useSelector((state) => state.tasks);
