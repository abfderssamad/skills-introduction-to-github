import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LanguageScreen from './screens/LanguageScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import RiddleGameScreen from './screens/RiddleGameScreen';
import ExploreScreen from './screens/ExploreScreen';
import MusicScreen from './screens/MusicScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import { I18nProvider } from './i18n/I18nContext';

export type RootStackParamList = {
  Language: undefined;
  MainMenu: undefined;
  RiddleGame: undefined;
  Explore: undefined;
  Music: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0b0b0b',
    primary: '#d35400'
  }
};

export default function App() {
  return (
    <I18nProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Language" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="RiddleGame" component={RiddleGameScreen} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen name="Music" component={MusicScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nProvider>
  );
}

