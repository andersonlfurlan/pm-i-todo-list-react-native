import { View, ScrollView, Text } from "react-native";
import { styles } from "../App";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { Button as PButton } from "react-native-paper";

export default function TaskList() {
  const tasksContext = useContext(TaskContext);

  const onClickTaskHandler = (task) => {
    tasksContext.finishTask(task);
  };

  const onRemoveTaskHandler = (task) => {
    tasksContext.removeTask(task);
  };
  return (
    <View style={styles.taskListContainer}>
      <ScrollView>
        {tasksContext.tasks.map((task) => {
          return (
            <View style={styles.taskItem(task)} key={task.id}>
              <Text style={styles.taskItemText(task)}> {task.description}</Text>
              <View style={styles.taskItemButtons}>
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
  );
}
