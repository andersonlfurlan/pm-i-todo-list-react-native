import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, removeCategoryAsync, selectCategories, selectCategoriesLoading } from '../store/features/categorySlice';
import CategoryList from '../components/CategoryList';
import { ActivityIndicator } from 'react-native-paper';

export default function CategoryListScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <CategoryList
      category={item}
      onEdit={(c) => navigation.navigate('CategoryForm', { category: c })}
      onRemove={(c) => dispatch(removeCategoryAsync(c.id))}
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CategoryForm')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  colorBox: { width: 12, height: 48, borderRadius: 4, marginRight: 12 },
  meta: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16 },
  desc: { color: '#666' },
  actions: { flexDirection: 'row', gap: 16 },
  link: { color: '#007bff' },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#007bff', alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 28 },
});
