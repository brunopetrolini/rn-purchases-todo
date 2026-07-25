import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['accent-brand'],
    height: 48,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors['base-white'],
    fontSize: 14,
    fontWeight: 600,
  },
});
