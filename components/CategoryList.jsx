import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const colorByPriority = (p) => {
  if (p === 1) return '#ff4d4d';
  if (p === 2) return '#ffd24d';
  return '#66cc66';
};

export default function CategoryList({ category, onEdit, onRemove }) {
  return (
    <View style={styles.itemRow}>
      <View style={[styles.colorBox, { backgroundColor: colorByPriority(category.priority) }]} />
      <View style={styles.meta}>
        <Text style={styles.name}>{category.name}</Text>
        {category.description ? <Text style={styles.desc}>{category.description}</Text> : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(category)}>
          <Text style={styles.link}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(category)}>
          <Text style={[styles.link, { color: 'red' }]}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  colorBox: { width: 12, height: 48, borderRadius: 4, marginRight: 12 },
  meta: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16 },
  desc: { color: '#666' },
  actions: { flexDirection: 'row', gap: 16 },
  link: { color: '#007bff' },
});
