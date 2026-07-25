import { Image, View } from 'react-native';

import { Button } from '../components/ui/Button';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <Button onPress={() => {}} title="Adicionar" />
      <Button onPress={() => {}} title="Editar" />
      <Button onPress={() => {}} title="Excluir" />
      <Button onPress={() => {}} title="Visualizar" />
      <Button onPress={() => {}} title="Atualizar" />
      <Button onPress={() => {}} title="Remover" />
    </View>
  );
}
