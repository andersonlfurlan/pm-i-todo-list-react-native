import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addTask = async (newTask) => {
  try {
    const response = await axios.post(API_URL, {
      ...newTask,
      createdDate: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const removeTask = async (task) => {
  try {
    await axios.delete(`${API_URL}/${task.id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const finishTask = async (taskDone) => {
  try {
    const response = await axios.put(`${API_URL}/${taskDone.id}`, {
      ...taskDone,
      completedDate: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const clearTasks = async () => {
  try {
    const tasks = await getTasks();
    await Promise.all(
      tasks.map((task) => axios.delete(`${API_URL}/${task.id}`))
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  getTasks,
  addTask,
  removeTask,
  finishTask,
  clearTasks,
};
