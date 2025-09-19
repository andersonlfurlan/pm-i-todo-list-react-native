import { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button as PButton } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTask } from "../store/features/taskSlice";

import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

export default function TaskRegister() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
    mode: 'onBlur'
  })

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
    dispatch(addTask(newTask));
    // setTaskName("");
    // setTaskDescription("");
    form.reset();
    // navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller control={form.control} name="name"
          render={
            ({ field }) =>
              <>
                <TextInput
                  style={styles.taskInput}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Digite o nome da tarefa"
                />
                <Text style={{ color: 'red' }}>
                  {form.formState.errors.name?.message}
                </Text>
              </>
          }
        >

        </Controller>
        {/* <Controller control={form.control} name="description">
          <TextInput
            style={styles.taskInput}
            value={taskDescription}
            onChangeText={onChangeDescriptionHandler}
            placeholder="Digite a descrição da tarefa"
            multiline
            numberOfLines={3}
          />
        </Controller> */}
      </View>
      <View style={globalStyles.taskItemButtons}>
        <PButton ion="plus" mode="contained" onPress={form.handleSubmit(onPressHandler)}
          disabled={!form.formState.isValid}>
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

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome da tarefa é obrigatório')
    .min(5, 'O nome da tarefa deve conter no mínimo 5 caracteres')
    .max(100, 'O nome da tarefa deve conter no máximo 100 caracteres')
    .default(''),
  description: Yup.string().default(''),
})