import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button as PButton } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../store/features/taskSlice";
import * as Yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  name: Yup.string().required('O nome da tarefa é obrigatório').min(5, 'O nome da tarefa deve ter pelo menos 5 caracteres').default(''),
  description: Yup.string().required('A descrição da tarefa é obrigatória').min(10, 'A descrição da tarefa deve ter pelo menos 10 caracteres').default(''),
});

export default function TaskRegister() {

  const form = useForm({ 
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
    mode: 'onBlur'
   });
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const onSubmit = (data) => {
    const newTask = {
      name: data.name,
      description: data.description,
      done: false,
    };
    dispatch(addTaskAsync(newTask));
    form.reset();
    navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller 
          control={form.control}
          name="name"
          render={({field}) => (
            <>
              <TextInput
                style={styles.taskInput}
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Digite o nome da tarefa"
                onBlur={field.onBlur}
                />
              {form.formState.errors.name && <Text style={{color: 'red'}}>{form.formState.errors.name.message}</Text>}
            </>
          )} 
        />
        <Controller 
          control={form.control}
          name="description"  
          render={({field}) => (
            <>
              <TextInput
                style={styles.taskInput}
                value={field.value}
                onChangeText={field.onChange} 
                placeholder="Digite a descrição da tarefa"
                multiline
                numberOfLines={5}
                onBlur={field.onBlur}
              />
              {form.formState.errors.description && <Text style={{color: 'red'}}>{form.formState.errors.description.message}</Text>}
            </>
          )}
        />
      </View>
      <View style={globalStyles.taskItemButtons}>
        <PButton icon="plus" mode="contained" onPress={form.handleSubmit(onSubmit)}>
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