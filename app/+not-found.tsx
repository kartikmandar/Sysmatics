import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// NotFoundScreen component definition
export default function NotFoundScreen() {
  return (
    <>
      {/* Set the title of the screen to 'Oops!' */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      {/* ThemedView container for the content */}
      <ThemedView style={styles.container}>
        {/* Display a title message */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        {/* Link to navigate back to the home screen */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Styles for the NotFoundScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
