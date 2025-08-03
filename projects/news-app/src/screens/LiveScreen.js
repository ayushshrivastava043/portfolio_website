import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { themes } from '../theme/themes';

export default function LiveScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.cyberpunk.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: themes.cyberpunk.text, fontSize: 20 }}>Live Streams Coming Soon!</Text>
    </View>
  );
} 