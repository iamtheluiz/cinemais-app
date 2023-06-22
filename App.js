import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import Home from './src/pages/Home';
import Landing from './src/pages/Landing';
import Movie from './src/pages/Movie';
import Genre from './src/pages/Genre';
import Cast from './src/pages/Cast';
import Cine from './src/pages/Cine';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    async function onFontLoad() {
      await SplashScreen.hideAsync();
    }
    onFontLoad();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movie" component={Movie} />
          <Stack.Screen name="Genre" component={Genre} />
          <Stack.Screen name="Cast" component={Cast} />
          <Stack.Screen name="Cine" component={Cine} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
