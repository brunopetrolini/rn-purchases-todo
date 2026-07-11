import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { global } from './styles';

export function Home() {
  return (
    <View style={global.container}>
      <Text >Hello to Purchases TO-DO!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

