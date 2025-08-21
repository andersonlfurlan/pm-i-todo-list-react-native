import { createContext, useState, useContext, useEffect } from "react";

import taskService from '../services/taskService';

export const TaskContext = createContext({
  tasks: [],
  addTask: (task) => { },
  finishTask: (task) => { },
  removeTask: (task) => { },
  clearTasks: () => { },
});

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // taskService
    //   .getTasks()
    //   .then(response => {
    //     setTasks(response);
    //   });
    const loadTasks = async () => {
      const response = await taskService.getTasks();
      setTasks(response);
    };
    loadTasks();
  }, [])

  const addTask = async (task) => {
    task.id = new Date().toISOString();
    task.createdDate = new Date();

    if (await taskService.addTask(task)) {
      setTasks((prevTasks) => {
        return [...prevTasks, {
          ...task,
        }];
      });
    }
  };

  const removeTask = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((t) => t.id !== task.id);
    });
  };

  const finishTask = (task) => {
    setTasks((prevTasks) => {
      return [
        ...prevTasks.map((t) => {
          return t.id === task.id
            ? {
              ...task,
              done: !task.done,
              completedDate: new Date(),
            }
            : t;
        }),
      ];
    });
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, finishTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
}
