import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

// Import custom components
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define the TabTwoScreen functional component
export default function TabTwoScreen() {
  return (
    // ParallaxScrollView component to provide a parallax effect
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={310} name="cog" style={styles.headerImage} />}
    >
      {/* Additional content can be added here */}
    </ParallaxScrollView>
  );
}

// Styles for the TabTwoScreen component
const styles = StyleSheet.create({
  // Style for the header image in the parallax scroll view
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  // Style for the title container
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
