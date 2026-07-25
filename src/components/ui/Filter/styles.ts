import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    color: colors['text-content'],
    fontSize: 12,
    fontWeight: 600,
  },
});
