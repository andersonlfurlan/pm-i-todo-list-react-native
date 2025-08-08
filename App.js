import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TaskContextProvider } from "./contexts/TaskContext";
import TaskList from "./components/TaskList";
import TaskRegister from "./components/TaskRegister";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from './screens/TaskListScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import TaskHomeScreen from "./screens/TaskHomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TaskContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskHome">
          <Stack.Screen name="TaskHome" component={TaskHomeScreen}></Stack.Screen>
          <Stack.Screen name="TaskList" component={TaskListScreen}></Stack.Screen>
          <Stack.Screen name="TaskForm" component={TaskFormScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      {/* <View style={styles.container}>
        <View style={styles.taskContainer}>
          <Text style={styles.title}>Minhas Tarefas</Text>
          <TaskRegister />
        </View>
        <TaskList />
        <StatusBar style="auto" />
      </View> */}
    </TaskContextProvider>
  );
}

const finishedTask = "darkseagreen";
const pendingTask = "indianred";

const taskStatus = (task, pending, finished) => task.done ? finished : pending;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    paddingTop: 32,
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  taskInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  taskItem: (task) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderColor: taskStatus(task, pendingTask, finishedTask),
    backgroundColor: taskStatus(task, pendingTask, finishedTask),
  }),
  taskItemText: (task) => ({
    marginTop: 10,
    textDecorationLine: taskStatus(task, 'none', "line-through"),
    marginLeft: 10,
  }),
  taskItemButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: "red",
    width: "60%",
    marginEnd: 8,
    padding: 8,
    borderRadius: 10,
  },
  taskListContainer: {
    backgroundColor: "lightyellow",
    flex: 6,
    paddingTop: 16,
  },
});
