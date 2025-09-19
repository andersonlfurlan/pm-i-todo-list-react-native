
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/'
});
const endpoint = 'tasks';

const getTasks = async () => {
    const response = await api.get(endpoint);
    console.log(response);
    return response.data;
}

const addTask = async (newTask) => {
    newTask.createdDate = new Date();
    const response = await api.post(endpoint, newTask);
    console.log('[addTask] response: ', response);
    return response.data;
}

const removeTask = async (task) => {
    return (await api.delete(`${endpoint}/${task.id}`)).data;
}

const finishTask = async (taskDone) => {

}

const clearTasks = () => {

}

export default {
    getTasks,
    addTask,
    removeTask,
    finishTask,
    clearTasks
};