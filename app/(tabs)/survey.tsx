import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import custom components
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

// Define the SurveyScreen functional component
export default function SurveyScreen() {
  return (
    // ParallaxScrollView component to provide a parallax effect
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={310} name="clipboard" style={styles.headerImage} />}
    >
      {/* ThemedView component for consistent styling across themes */}
      <ThemedView style={styles.contentContainer}>
        {/* Title of the survey */}
        <ThemedText type="title" style={styles.titleText}>
          Survey
        </ThemedText>
        {/* Collapsible sections for the survey content */}
        <Collapsible title="Section 1">
          <ThemedText style={styles.sectionText}>Content for section 1</ThemedText>
        </Collapsible>
        <Collapsible title="Section 2">
          <ThemedText style={styles.sectionText}>Content for section 2</ThemedText>
        </Collapsible>
        <Collapsible title="Section 3">
          <ThemedText style={styles.sectionText}>Content for section 3</ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Styles for the SurveyScreen component
const styles = StyleSheet.create({
  // Style for the header image in the parallax scroll view
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  // Style for the content container
  contentContainer: {
    padding: 16,
  },
  // Style for the title text
  titleText: {
    fontSize: 24,
    marginBottom: 16,
  },
  // Style for the section text
  sectionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  // Style for the external link text
  linkText: {
    fontSize: 16,
    color: '#007aff',
    marginTop: 16,
  },
});
