import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import taskService from "../services/taskService";
import { setTasks } from "../store/taskSlice";

export default function TaskHomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await taskService.getTasks();
      dispatch(setTasks(storedTasks));
    };
    loadTasks();
  }, []);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View>
      <View style={styles.homeButtons}>
        <Button mode="contained" onPress={() => navigate("TaskList")}>
          Lista
        </Button>
        <Button mode="contained" onPress={() => navigate("TaskForm")}>
          Cadastro
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeButtons: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
});
