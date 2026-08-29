import AsyncStorage from '@react-native-async-storage/async-storage';

import type { FilterStatus } from '@/types/filter-status';

const ITEMS_STORAGE_KEY = '@purchases-todo:items';

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const persistedItems = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return persistedItems ? JSON.parse(persistedItems) : [];
  } catch (error) {
    throw new Error('Erro ao buscar os itens do armazenamento', {
      cause: error,
    });
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const persistedItems = await get();
  const filteredItems = persistedItems.filter((item) => item.status === status);
  return filteredItems;
}

export const itemsStorage = {
  get,
  getByStatus,
};
