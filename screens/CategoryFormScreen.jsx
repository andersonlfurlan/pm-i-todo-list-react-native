import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCategoryAsync, updateCategoryAsync } from '../store/features/categorySlice';
import { ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(5, 'Mínimo 5 caracteres'),
  priority: yup.number().required('Prioridade é obrigatória').min(1, 'A prioridade deve ser um valor entre 1 e 3').max(3, 'A prioridade deve ser um valor entre 1 e 3'),
  description: yup.string().notRequired(),
});

export default function CategoryFormScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const category = route?.params?.category;

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: category || { name: '', priority: '2', description: '' },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const { errors, isValid }  = formState;

  useEffect(() => {
    if (category) {
      reset({ ...category });
    }
  }, [category, reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      if (category) {
        await dispatch(updateCategoryAsync({ ...category, ...data }));
      } else {
        await dispatch(addCategoryAsync({ ...data }));
      }
      navigation.goBack();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text>Prioridade (1-3)</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.input} keyboardType="numeric" onBlur={onBlur} onChangeText={(t) => onChange(Number(t))} value={String(value)} />
        )}
      />
      {errors.priority && <Text style={styles.error}>{errors.priority.message}</Text>}

      <Text>Descrição</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
      />

      {submitting ? (
        <View style={{ marginTop: 8 }}>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <Button title="Salvar" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
});
