import { createContext, useState, useContext, useEffect } from "react";
import taskService from "../services/taskService.js";

export const TaskContext = createContext({
  tasks: [],
  addTask: (task) => {},
  finishTask: (task) => {},
  removeTask: (task) => {},
  clearTasks: () => {},
});

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      console.log("Fetching tasks from service...");
      const data = await taskService.getTasks();
      console.log("Tasks fetched:", data);
      setTasks(data);
    })();
  }, [refresh]);

  const refreshList = () => {
    setRefresh((refresh) => !refresh);
  };

  const addTask = async (task) => {
    await taskService.addTask(task);
    refreshList();
  };

  const removeTask = async (task) => {
    await taskService.removeTask(task);
    refreshList();
  };

  const finishTask = async (task) => {''
    await taskService.finishTask(task);
    refreshList();
  };

  const clearTasks = async () => {
    await taskService.clearTasks();
    refreshList();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, finishTask, clearTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
