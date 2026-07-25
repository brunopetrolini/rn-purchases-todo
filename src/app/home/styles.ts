import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors['background-primary'],
    paddingTop: 62,
  },

  logo: {
    width: 134,
    height: 34,
  },

  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 42,
  },

  content: {
    flex: 1,
    width: '100%',
    backgroundColor: colors['background-elevated'],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 24,
    padding: 24,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: Math.PI,
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filters: {
    flexDirection: 'row',
    gap: 12,
  },

  clearLabel: {
    fontSize: 12,
    color: colors['text-muted'],
    fontWeight: 600,
  },
});
