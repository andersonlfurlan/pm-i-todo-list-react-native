import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "./screens/TaskListScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import TaskHomeScreen from "./screens/TaskHomeScreen";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import { Provider, useDispatch } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskHome">
          <Stack.Screen
            name="TaskHome"
            component={TaskHomeScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  taskItemButtons: {
    flexDirection: "row",
    gap: 10,
  },
});
