import AsyncStorage from "@react-native-async-storage/async-storage";

const key = '@TASKS';

const getTasks = async () => {
    // return AsyncStorage
    //     .getItem(key)
    //     .then(tasks => {
    //         console.log('getTasks: ', tasks);
    //         return JSON.parse(tasks) || [];
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         return [];
    //     })
    try {
        const tasks = await AsyncStorage.getItem(key);
        return JSON.parse(tasks) || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addTask = async (newTask) => {
    const currentTasks = await getTasks();
    try {
        const value = JSON.stringify([...currentTasks, newTask]);
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const removeTask = () => {

}

const finishTask = () => {

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