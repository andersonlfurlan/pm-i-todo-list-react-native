import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button as PButton } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../store/features/taskSlice";

export default function TaskRegister() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChangeNameHandler = (name) => {
    setTaskName(name);
  };

  const onChangeDescriptionHandler = (description) => {
    setTaskDescription(description);
  };

  const onPressHandler = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      done: false,
    };
    dispatch(addTaskAsync(newTask));
    setTaskName("");
    setTaskDescription("");
    navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.taskInput}
          value={taskName}
          onChangeText={onChangeNameHandler}
          placeholder="Digite o nome da tarefa"
        />
        <TextInput
          style={styles.taskInput}
          value={taskDescription}
          onChangeText={onChangeDescriptionHandler}
          placeholder="Digite a descrição da tarefa"
          multiline
          numberOfLines={3}
        />
      </View>
      <View style={globalStyles.taskItemButtons}>
        <PButton icon="plus" mode="contained" onPress={onPressHandler}>
          Adicionar
        </PButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 16,
    gap: 12,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});