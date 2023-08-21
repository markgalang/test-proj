import { ActivityIndicator, View } from 'react-native';

export function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ActivityIndicator size='large' />
    </View>
  );
}
