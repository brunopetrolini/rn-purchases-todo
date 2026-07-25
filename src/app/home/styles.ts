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
    paddingTop: 32,
  },

  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomColor: colors['border-primary'],
    borderBottomWidth: 1,
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

  list: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },

  listEmpty: {
    flex: 1,
    color: colors['text-muted'],
    fontSize: 14,
    textAlign: 'center',
  },

  itemSeparator: {
    height: 1,
    backgroundColor: colors['border-primary'],
    marginVertical: 16,
  },
});
