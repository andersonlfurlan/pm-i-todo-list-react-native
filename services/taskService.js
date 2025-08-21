import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@TASKS";

const getTasks = async () => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

const setTasks = async (tasks) => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const addTask = async (task) => {
  const currentTasks = await getTasks();
  const updatedTasks = [...currentTasks, { ...task, createdDate: new Date() }];
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

const removeTask = async (task) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.filter((t) => t.id !== task.id);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

const finishTask = async (task) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.map((t) =>
    t.id === task.id ? { ...t, done: !task.done, completedDate: new Date() } : t
  );
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

const clearTasks = async () => {
  await AsyncStorage.removeItem(TASKS_KEY);
};

const taskService = {
  getTasks,
  addTask,
  removeTask,
  finishTask,
  clearTasks,
  setTasks
};

export default taskService;
