import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Get the current color scheme (light or dark) using a custom hook.
  const colorScheme = useColorScheme();

  // Load custom fonts using the useFonts hook from expo-font.
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen once the fonts are loaded.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // If the fonts are not yet loaded, do not render anything.
  if (!loaded) {
    return null;
  }

  return (
    // Provide the theme (light or dark) based on the current color scheme.
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Define the main tab screen and hide the header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Define the not-found screen for handling unknown routes */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
