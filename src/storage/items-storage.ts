import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { FilterStatus } from '@/types/filter-status';
import type { Item } from '@/types/item';

const ITEMS_STORAGE_KEY = '@purchases-todo:items';

function orderItemsByStatus(items: Item[]): Item[] {
  return [...items].sort(
    (a, b) =>
      Number(a.status === FilterStatus.PURCHASED) -
      Number(b.status === FilterStatus.PURCHASED),
  );
}

async function getItems(): Promise<Item[]> {
  try {
    const persistedItems = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    const items = persistedItems ? JSON.parse(persistedItems) : [];
    return orderItemsByStatus(items);
  } catch (error) {
    Alert.alert(
      'Erro ao buscar itens',
      `Não foi possível buscar seus itens, por favor tente novamente.
      Se o problema persistir, entre em contato com o nosso suporte.`,
    );
    throw new Error('GET_ITEMS', {
      cause: error,
    });
  }
}

async function getItemByStatus(status: FilterStatus): Promise<Item[]> {
  const items = await getItems();
  if (status === FilterStatus.ALL) return orderItemsByStatus(items);
  return items.filter((item) => item.status === status);
}

async function save(items: Item[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    Alert.alert(
      'Erro ao salvar itens',
      `Não foi possível salvar seus itens, por favor tente novamente.
      Se o problema persistir, entre em contato com o nosso suporte.`,
    );
    throw new Error('SAVE_ITEMS', {
      cause: error,
    });
  }
}

async function add(item: Item): Promise<Item[]> {
  const items = await getItems();
  const updatedItems = [...items, item];
  await save(updatedItems);
  return orderItemsByStatus(updatedItems);
}

async function update(item: Item): Promise<Item[]> {
  const items = await getItems();
  const updatedItems = items.map((index) =>
    index.id === item.id ? item : index,
  );
  await save(updatedItems);
  return orderItemsByStatus(updatedItems);
}

async function remove(id: string): Promise<Item[]> {
  const items = await getItems();
  const updatedItems = items.filter((item) => item.id !== id);
  await save(updatedItems);
  return orderItemsByStatus(updatedItems);
}

export const itemsStorage = {
  getAllItems: getItems,
  getItemsByStatus: getItemByStatus,
  addItem: add,
  updateItem: update,
  deleteItem: remove,
};
