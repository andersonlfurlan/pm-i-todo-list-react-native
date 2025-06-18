import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TaskContextProvider } from "./contexts/TaskContext";
import TaskList from "./components/TaskList";
import TaskRegister from "./components/TaskRegister";

export default function App() {
  return (
    <TaskContextProvider>
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <Text style={styles.title}>Minhas Tarefas</Text>
          <TaskRegister />
        </View>
        <TaskList />
        <StatusBar style="auto" />
      </View>
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
