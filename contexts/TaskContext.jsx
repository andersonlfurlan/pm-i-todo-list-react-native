import { createContext, useState, useContext } from "react";

export const TaskContext = createContext({
  tasks: [],
  addTask: (task) => { },
  finishTask: (task) => { },
  removeTask: (task) => { },
  clearTasks: () => { },
});

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: new Date().toISOString(),
      name: 'Tarefa 1',
      description: "Descrição da tarefa 1",
      done: false,
      createdDate: new Date(),
    },
  ]);

  const addTask = (task) => {
    console.log("new task: ", task);
    setTasks((prevTasks) => {
      return [...prevTasks, {
        ...task,
        createdDate: new Date(),
      }];
    });
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
