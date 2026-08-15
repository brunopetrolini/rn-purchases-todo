import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Item } from '@/types/item';

const ITEMS_STORAGE_KEY = '@purchases-todo:items';

async function getItems(): Promise<Item[]> {
  const persistedItems = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
  return persistedItems ? JSON.parse(persistedItems) : [];
}

async function saveItems(items: Item[]): Promise<void> {
  await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
}

export const storageClient = {
  getItems,
  saveItems,
};
