import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { Button as PButton } from 'react-native-paper';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const onChangeTextHandler = (task) => {
    setTask(task);
  };

  const onPressHandler = () => {
    setTasks((previousTask) => [
      ...previousTask,
      { id: new Date().toISOString(), description: task, done: false },
    ]);
    setTask("");
  };

  const onClickTaskHandler = (task) => {
    setTasks((currentTasks) =>
      currentTasks.map((t) => {
        if (t.id === task.id) {
          t.done = !t.done;
        }
        return t;
      })
    );
  };

  const onRemoveTaskHandler = (task) => {
    setTasks((previousTasks) => {
      return [...previousTasks.filter(t => t.id !== task.id)];
    })
  }

  const onRemoveAllHandler = () => setTasks([]);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <View style={styles.taskInputContainer}>
          <TextInput
            style={styles.taskInput}
            value={task}
            onChangeText={onChangeTextHandler}
            placeholder="Digite sua tarefa aqui"
          />
          <View style={styles.taskItemButtons}>
            <PButton icon="plus" mode="contained" onPress={onPressHandler}>
              Adicionar
            </PButton>
            <PButton icon="trash-can" mode="contained" onPress={onRemoveAllHandler}>
              Excluir tudo
            </PButton>
          </View>
        </View>
      </View>
      <View style={styles.taskListContainer}>
        <ScrollView>
          {tasks.map((task) => {
            return (
              <View style={styles.taskItem(task)} key={task.id}>
                <Text style={styles.taskItemText(task)}>
                  {" "}
                  {task.description}
                </Text>
                <View style={styles.taskItemButtons}>
                  <PButton mode="contained-tonal" onPress={() => onClickTaskHandler(task)}>
                    {task.done ? 'Para fazer' : 'Concluir'}
                  </PButton>
                  <PButton mode="contained-tonal" onPress={() => onRemoveTaskHandler(task)}>
                    Remover
                  </PButton>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const finishedTask = "darkseagreen";
const pendingTask = "indianred";

const taskStatus = (task, pending, finished) => task.done ? finished : pending;

const styles = StyleSheet.create({
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
