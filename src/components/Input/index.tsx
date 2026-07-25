import { TextInput, type TextInputProps } from 'react-native';

import { colors } from '@/theme/colors';
import { styles } from './styles';

type InputProps = TextInputProps;

export function Input(props: InputProps) {
  return (
    <TextInput
      placeholderTextColor={colors['text-muted']}
      {...props}
      style={styles.container}
    />
  );
}
