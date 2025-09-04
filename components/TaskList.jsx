import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button as PButton } from "react-native-paper";

import { globalStyles } from "../styles/globalStyles.jsx";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { finishTask, initTasks, removeAllTasks, removeTask, selectTasks } from '../store/features/taskSlice.js'
import { useEffect } from "react";
import taskService from "../services/taskService.js";

export default function TaskList() {
  const navigation = useNavigation();
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  console.log('tasks: ', tasks);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await taskService.getTasks();
      console.log('storedTasks: ', storedTasks);
      dispatch(initTasks(storedTasks)); 
    };
    loadTasks();
  }, [dispatch]);


  const onClickTaskHandler = (task) => {
    dispatch(finishTask(task))
  };

  const onRemoveTaskHandler = (task) => {
    dispatch(removeTask(task))
  };

  const onClickDetailHandler = (task) => {
    navigation.navigate('TaskDetail', {
      task,
    })
  }

  const onRemoveAllHandler = () => dispatch(removeAllTasks());

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
          {tasks.map((task) => {
            return (
              <View style={styles.taskItem(task)} key={task.id}>
                <Text style={styles.taskItemText(task)}> {task.name}</Text>
                <View style={globalStyles.taskItemButtons}>
                  <PButton
                    mode="contained-tonal"
                    onPress={() => onClickDetailHandler(task)}>
                    Detalhes
                  </PButton>
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
