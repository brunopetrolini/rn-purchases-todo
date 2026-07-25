import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    color: colors['text-content'],
  },

  deleteButton: {},
});
