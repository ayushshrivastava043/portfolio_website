import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import VideoScreen from './src/screens/VideoScreen';
import LiveScreen from './src/screens/LiveScreen';
import { themes } from './src/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: themes.cyberpunk.primary,
            tabBarStyle: { backgroundColor: themes.cyberpunk.surface },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'newspaper-variant-outline';
              else if (route.name === 'Videos') iconName = 'youtube';
              else if (route.name === 'Live') iconName = 'broadcast';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Videos" component={VideoScreen} />
          <Tab.Screen name="Live" component={LiveScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 