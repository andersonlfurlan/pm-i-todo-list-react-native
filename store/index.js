import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/taskSlice";
import { categoriesReducer } from "./features/categorySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer,
    },
});

// Se desejar persistir manualmente no AsyncStorage, descomente e ajuste abaixo
// store.subscribe(() => {
//   AsyncStorage.setItem('@TASKS', JSON.stringify(store.getState().tasks));
//   AsyncStorage.setItem('@CATEGORIES', JSON.stringify(store.getState().categories));
// });