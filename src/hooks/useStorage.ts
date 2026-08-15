import { useCallback } from 'react';
import { Alert } from 'react-native';

import { storageClient } from '@/storage/storage-client';
import { FilterStatus } from '@/types/filter-status';
import type { Item } from '@/types/item';

export function useItemsStorage() {
  const getItems = useCallback(async () => {
    try {
      return await storageClient.getItems();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro ao buscar seus itens',
        'Não foi possível recuperar os itens do armazenamento, tente fechar e abrir o app novamente.',
      );
    }
  }, []);

  const getItemsByStatus = useCallback(async (status: FilterStatus) => {
    try {
      const items = await storageClient.getItems();
      return items.filter(
        (item) => item.isChecked === (status === FilterStatus.PURCHASED),
      );
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro ao buscar seus itens',
        'Não foi possível recuperar os itens do armazenamento, tente fechar e abrir o app novamente.',
      );
    }
  }, []);

  const saveItems = useCallback(async (items: Item[]) => {
    try {
      await storageClient.saveItems(items);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro ao salvar seus itens',
        'Não foi possível salvar os itens no armazenamento, tente fechar e abrir o app novamente.',
      );
    }
  }, []);

  return {
    getItems,
    getItemsByStatus,
    saveItems,
  };
}
