import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./taskSlice";
import taskService from "../services/taskService";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  taskService.setTasks(state.tasks);
});

export default store;
