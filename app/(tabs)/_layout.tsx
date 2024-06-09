import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the TabLayout component
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // Set default screen options for the tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home'} color={color} />
          ),
        }}
      />
      {/* Info Tab */}
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'information-circle' : 'information-circle'} color={color} />
          ),
        }}
      />
      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cog' : 'cog'} color={color} />
          ),
        }}
      />
      {/* Surveys Tab */}
      <Tabs.Screen
        name="survey"
        options={{
          title: 'Surveys',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
