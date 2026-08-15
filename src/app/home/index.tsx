import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { v7 as uuid } from 'uuid';

import { Button } from '@/components/button';
import { Filter } from '@/components/filter';
import { Input } from '@/components/input';
import { ListItem } from '@/components/list-item';
import { useItemsStorage } from '@/hooks/useItemsStorage';
import { FilterStatus } from '@/types/filter-status';
import type { Item } from '@/types/item';
import { styles } from './styles';

export function Home() {
  const { getItems, saveItems } = useItemsStorage();

  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const loadItems = useCallback(async () => {
    const persistedItems = await getItems();
    setItems(persistedItems);
  }, [getItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === FilterStatus.ALL) return items;

    const isChecked = activeFilter === FilterStatus.PURCHASED;
    return items.filter((item) => item.isChecked === isChecked);
  }, [activeFilter, items]);

  async function persistItems(updatedItems: Item[]) {
    const didSave = await saveItems(updatedItems);

    await loadItems();
    return didSave;
  }

  async function handleCheckItem(id: string) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });

    await persistItems(updatedItems);
  }

  async function handleDeleteItem(id: string) {
    const updatedItems = items.filter((item) => item.id !== id);
    await persistItems(updatedItems);
  }

  async function handleAddItem() {
    if (!inputValue.trim()) return;

    const newItem: Item = {
      id: uuid(),
      name: inputValue.trim(),
      isChecked: false,
    };

    const updatedItems = [...items, newItem];
    const didSave = await persistItems(updatedItems);

    if (didSave) setInputValue('');
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button onPress={handleAddItem} title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.filtersContainer}>
          <View style={styles.filters}>
            <Filter
              status={FilterStatus.PENDING}
              isActive={activeFilter === FilterStatus.PENDING}
              onPress={() => setActiveFilter(FilterStatus.PENDING)}
            />
            <Filter
              status={FilterStatus.PURCHASED}
              isActive={activeFilter === FilterStatus.PURCHASED}
              onPress={() => setActiveFilter(FilterStatus.PURCHASED)}
            />
          </View>

          <TouchableOpacity
            disabled={activeFilter === FilterStatus.ALL}
            onPress={() => setActiveFilter(FilterStatus.ALL)}
          >
            <Text style={styles.clearLabel}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.listEmpty}>Nenhum item aqui!</Text>
          }
          style={styles.list}
          data={filteredItems}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              isChecked={item.isChecked}
              onCheck={() => handleCheckItem(item.id)}
              onDelete={() => handleDeleteItem(item.id)}
              key={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </View>
  );
}
