import { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  Card,
  IconButton,
} from "react-native-paper";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), description: task, done: false }]);
      setTask("");
    }
  };

  const toggleTask = (taskToToggle) => {
    setTasks((currentTasks) =>
      currentTasks.map((t) =>
        t.id === taskToToggle.id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (taskToDelete) => {
    setTasks((currentTasks) =>
      currentTasks.filter((t) => t.id !== taskToDelete.id)
    );
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Minhas Tarefas
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            label="Digite sua tarefa"
            mode="outlined"
            value={task}
            onChangeText={setTask}
            style={styles.input}
          />
          <Button mode="contained" onPress={addTask} style={styles.button}>
            Adicionar
          </Button>
          <Button
            mode="outlined"
            onPress={deleteAllTasks}
            style={styles.button}
            textColor="red"
          >
            Excluir todas
          </Button>
        </View>

        <ScrollView style={styles.taskList}>
          {tasks.map((t) => (
            <Card
              key={t.id}
              style={{
                margin: 8,
                backgroundColor: t.done ? "#c8e6c9" : "#ffcdd2",
              }}
            >
              <Card.Title
                title={t.description}
                titleStyle={{
                  textDecorationLine: t.done ? "line-through" : "none",
                }}
                right={(props) => (
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      {...props}
                      icon={t.done ? "check-circle-outline" : "check"}
                      onPress={() => toggleTask(t)}
                    />
                    <IconButton
                      {...props}
                      icon="delete"
                      onPress={() => deleteTask(t)}
                      iconColor="red"
                    />
                  </View>
                )}
              />
            </Card>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    flexGrow: 1,
    minWidth: "55%",
  },
  button: {
    marginVertical: 8,
  },
  taskList: {
    marginTop: 16,
  },
});
