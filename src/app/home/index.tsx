import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/button';
import { Filter } from '@/components/filter';
import { Input } from '@/components/input';
import { FilterStatus } from '@/types/filter-status';
import { styles } from './styles';

export function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

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
      </View>
    </View>
  );
}
