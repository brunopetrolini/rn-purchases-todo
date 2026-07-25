import { CheckCircleIcon, CircleDashedIcon } from 'phosphor-react-native';
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { colors } from '@/theme/colors';
import { FilterStatus } from '@/types/filter-status';
import { styles } from './styles';

type FilterProps = TouchableOpacityProps & {
  status: Omit<FilterStatus, FilterStatus.ALL>;
  isActive?: boolean;
};

export function Filter({
  status,
  isActive = false,
  activeOpacity = 0.8,
  ...props
}: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={activeOpacity}
      {...props}
    >
      {isActive ? (
        <CheckCircleIcon size={18} color={colors['accent-brand']} />
      ) : (
        <CircleDashedIcon size={18} color={colors['text-content']} />
      )}

      <Text style={styles.title}>
        {status === FilterStatus.PENDING && 'Pendentes'}
        {status === FilterStatus.PURCHASED && 'Comprados'}
      </Text>
    </TouchableOpacity>
  );
}
