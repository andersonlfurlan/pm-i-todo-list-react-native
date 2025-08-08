import { useState } from "react";
import { styles } from "../App";
import { View, TextInput } from "react-native";
import { Button as PButton } from "react-native-paper";
import { useTaskContext } from "../contexts/TaskContext";

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

  const onRemoveAllHandler = () => tasksContext.clearTasks();

  return (
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
  );
}
