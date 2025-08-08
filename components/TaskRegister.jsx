import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button as PButton } from "react-native-paper";
import { useTaskContext } from "../contexts/TaskContext";
import { globalStyles } from "../styles/globalStyles";

export default function TaskRegister() {
  const [task, setTask] = useState("");
  const tasksContext = useTaskContext();

  const onChangeTextHandler = (task) => {
    setTask(task);
  };

  const onPressHandler = () => {
    tasksContext.addTask({
      id: new Date().toISOString(),
      description: task,
      done: false,
    });
    setTask("");
  };


  return (
    <View style={styles.taskInputContainer}>
      <TextInput
        style={styles.taskInput}
        value={task}
        onChangeText={onChangeTextHandler}
        placeholder="Digite sua tarefa aqui"
      />
      <View style={globalStyles.taskItemButtons}>
        <PButton icon="plus" mode="contained" onPress={onPressHandler}>
          Adicionar
        </PButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  taskInput: {
    borderWidth: 1,
    borderColor: "red",
    width: "60%",
    marginEnd: 8,
    padding: 8,
    borderRadius: 10,
  },
})