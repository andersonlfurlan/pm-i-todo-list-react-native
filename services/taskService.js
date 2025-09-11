
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

const getTasks = async () => {
    const response = await api.get('tasks');
    console.log(response);
    return response.data;
}

const addTask = async (newTask) => {

}

const removeTask = async (task) => {

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