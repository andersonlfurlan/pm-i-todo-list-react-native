import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useTaskContext } from "../contexts/TaskContext";
import { Button as PButton } from "react-native-paper";

import { globalStyles } from "../styles/globalStyles.jsx";
import { useNavigation } from "@react-navigation/native";

export default function TaskList() {
  const navigation = useNavigation();
  const tasksContext = useTaskContext();

  const onClickTaskHandler = (task) => {
    tasksContext.finishTask(task);
  };

  const onRemoveTaskHandler = (task) => {
    tasksContext.removeTask(task);
  };

  const onRemoveAllHandler = () => tasksContext.clearTasks();

  return (
    <>
      <View style={styles.removeAllContainer}>
        <PButton icon="plus" mode="contained" onPress={
          () => navigation.navigate('TaskForm')
        }>
          Adicionar
        </PButton>
        <PButton icon="trash-can" mode="contained" onPress={onRemoveAllHandler}>
          Excluir tudo
        </PButton>
      </View>
      <View style={styles.taskListContainer}>
        <ScrollView>
          {tasksContext.tasks.map((task) => {
            return (
              <View style={styles.taskItem(task)} key={task.id}>
                <Text style={styles.taskItemText(task)}> {task.description}</Text>
                <View style={globalStyles.taskItemButtons}>
                  <PButton
                    mode="contained-tonal"
                    onPress={() => onClickTaskHandler(task)}
                  >
                    {task.done ? "Para fazer" : "Concluir"}
                  </PButton>
                  <PButton
                    mode="contained-tonal"
                    onPress={() => onRemoveTaskHandler(task)}
                  >
                    Remover
                  </PButton>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const finishedTask = "darkseagreen";
const pendingTask = "indianred";
const taskStatus = (task, pending, finished) => task.done ? finished : pending;

const styles = StyleSheet.create({
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
  taskListContainer: {
    backgroundColor: "lightyellow",
    flex: 6,
    paddingTop: 16,
  },
  removeAllContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  }
})
