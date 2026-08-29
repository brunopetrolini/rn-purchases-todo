import { randomUUID } from 'expo-crypto';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/button';
import { Filter } from '@/components/filter';
import { Input } from '@/components/input';
import { ListItem } from '@/components/list-item';
import { itemsStorage } from '@/storage/items-storage';
import { FilterStatus } from '@/types/filter-status';
import type { Item } from '@/types/item';
import { styles } from './styles';

export function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');

  const filteredItems = useMemo(() => {
    if (activeFilter === FilterStatus.ALL) return items;

    return items.filter((item) => item.status === activeFilter);
  }, [activeFilter, items]);

  async function handleCheckItem(id: string) {
    const updatedItem = items.find((item) => item.id === id);
    if (!updatedItem) return;

    const updatedItems = await itemsStorage.updateItem({
      ...updatedItem,
      status:
        updatedItem.status === FilterStatus.PENDING
          ? FilterStatus.PURCHASED
          : FilterStatus.PENDING,
    });

    setItems(updatedItems);
  }

  async function handleDeleteItem(id: string) {
    const updatedItems = await itemsStorage.deleteItem(id);
    setItems(updatedItems);
  }

  async function handleAddItem() {
    if (!inputValue.trim()) return;

    const newItem: Item = {
      id: randomUUID(),
      name: inputValue.trim(),
      status: FilterStatus.PENDING,
    };

    const updatedItems = await itemsStorage.addItem(newItem);

    setItems(updatedItems);
    setInputValue('');
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchItems() {
      const persistedItems = await itemsStorage.getAllItems();
      if (isMounted) setItems(persistedItems);
    }

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

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
              isChecked={item.status === FilterStatus.PURCHASED}
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
