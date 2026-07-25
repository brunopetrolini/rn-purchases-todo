import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & { title: string };

export function Button({ title, activeOpacity = 0.8, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
