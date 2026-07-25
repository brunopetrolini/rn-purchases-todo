import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/button';
import { Filter } from '@/components/filter';
import { Input } from '@/components/input';
import { ListItem } from '@/components/list-item';
import { FilterStatus } from '@/types/filter-status';
import { styles } from './styles';

const mockData = [
  {
    id: '2d63636c-7ba0-4cb8-959c-468963c8e213',
    name: '3 Tomates',
    isChecked: false,
  },
  {
    id: '009611f9-c556-4bd9-aa47-ff10e6d0f266',
    name: '1 Pacote de Arroz',
    isChecked: false,
  },
  {
    id: '1a887a90-46aa-4830-a2f1-c384eae2b208',
    name: '2 Litros de Leite',
    isChecked: false,
  },
  {
    id: 'e05e9bef-92e5-4f8e-8682-749770be01c9',
    name: '5 Bananas',
    isChecked: false,
  },
  {
    id: 'c2f0a8d4-c809-4d15-bfd5-b70fa16a77cf',
    name: '1 Filé de Frango',
    isChecked: false,
  },
];

export function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  const sortItemsByCheckedStatus = useCallback((items: typeof mockData) => {
    return items.sort((a, b) => Number(b.isChecked) - Number(a.isChecked));
  }, []);

  const [items, setItems] = useState(sortItemsByCheckedStatus(mockData));
  const [filteredItems, setFilteredItems] = useState(items);

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

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button onPress={() => {}} title="Adicionar" />
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
