import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { v7 as uuid } from 'uuid';

import { Button } from '@/components/button';
import { Filter } from '@/components/filter';
import { Input } from '@/components/input';
import { ListItem } from '@/components/list-item';
import { FilterStatus } from '@/types/filter-status';
import type { Item } from '@/types/item';
import { styles } from './styles';

export function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  const sortItemsByCheckedStatus = useCallback((items: Item[]) => {
    return items.sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
  }, []);

  const [items, setItems] = useState<Item[]>(sortItemsByCheckedStatus([]));
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (activeFilter === FilterStatus.ALL) {
      setFilteredItems(sortItemsByCheckedStatus(items));
    }

    if (activeFilter === FilterStatus.PENDING) {
      setFilteredItems(() => {
        const pendingItems = items.filter((item) => !item.isChecked);
        return sortItemsByCheckedStatus(pendingItems);
      });
    }

    if (activeFilter === FilterStatus.PURCHASED) {
      setFilteredItems(() => {
        const purchasedItems = items.filter((item) => item.isChecked);
        return sortItemsByCheckedStatus(purchasedItems);
      });
    }
  }, [activeFilter, items, sortItemsByCheckedStatus]);

  function handleCheckItem(id: string) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item,
      );
      return sortItemsByCheckedStatus(updatedItems);
    });
  }

  function handleDeleteItem(id: string) {
    setItems((prevItems) => {
      const itemsWithoutDeleted = prevItems.filter((item) => item.id !== id);
      return sortItemsByCheckedStatus(itemsWithoutDeleted);
    });
  }

  function handleAddItem() {
    if (!inputValue.trim()) return;

    const newItem: Item = {
      id: uuid(),
      name: inputValue.trim(),
      isChecked: false,
    };

    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      return sortItemsByCheckedStatus(updatedItems);
    });

    setInputValue('');
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
