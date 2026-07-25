import {
  CheckCircleIcon,
  CircleDashedIcon,
  TrashIcon,
} from 'phosphor-react-native';
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { colors } from '@/theme/colors';
import { styles } from './styles';

type ListItemProps = TouchableOpacityProps & {
  name: string;
  isChecked: boolean;
  onCheck: () => void;
  onDelete: () => void;
};

export function ListItem({
  name,
  isChecked,
  onCheck,
  onDelete,
  ...props
}: ListItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onCheck}
      {...props}
    >
      {isChecked ? (
        <CheckCircleIcon size={18} color={colors['accent-brand']} />
      ) : (
        <CircleDashedIcon size={18} color={colors['text-content']} />
      )}

      <Text style={styles.title}>{name}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        activeOpacity={0.6}
        onPress={onDelete}
      >
        <TrashIcon size={18} color={colors['text-muted']} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
