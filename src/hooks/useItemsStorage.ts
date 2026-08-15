import { useCallback } from 'react';
import { Alert } from 'react-native';

import { storageClient } from '@/storage/storage-client';
import type { Item } from '@/types/item';

function sortItemsByCheckedStatus(items: Item[]) {
  return [...items].sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
}

export function useItemsStorage() {
  const getItems = useCallback(async () => {
    try {
      const items = await storageClient.getItems();
      return sortItemsByCheckedStatus(items);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro ao buscar seus itens',
        'Não foi possível recuperar os itens do armazenamento, tente fechar e abrir o app novamente.',
      );
      return [];
    }
  }, []);

  const saveItems = useCallback(async (items: Item[]) => {
    try {
      await storageClient.saveItems(items);
      return true;
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro ao salvar seus itens',
        'Não foi possível salvar os itens no armazenamento, tente fechar e abrir o app novamente.',
      );
      return false;
    }
  }, []);

  return {
    getItems,
    saveItems,
  };
}
