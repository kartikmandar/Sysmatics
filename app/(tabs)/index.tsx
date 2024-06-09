import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, Dimensions, Platform, ActivityIndicator, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../loginScreen';
import AccelerometerSensor from '../(sensors)/AccelerometerSensor';
import GyroscopeSensor from '../(sensors)/GyroscopeSensor';
import MagnetometerSensor from '../(sensors)/MagnetometerSensor';
import BarometerSensor from '../(sensors)/BarometerSensor';
import LightSensorComponent from '../(sensors)/LightSensor';
import PedometerSensor from '../(sensors)/PedometerSensor';
import DeviceMotionSensor from '../(sensors)/DeviceMotionSensor';

const { width: screenWidth } = Dimensions.get('window');

// Define the main HomeScreen component
export default function HomeScreen() {
  // Define state variables
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllSensorsActive, setIsAllSensorsActive] = useState(false);

  // Effect to check login status on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        let loggedIn;
        if (Platform.OS === 'web') {
          loggedIn = localStorage.getItem('isLoggedIn');
        } else {
          loggedIn = await SecureStore.getItemAsync('isLoggedIn');
        }
        if (loggedIn === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to check login status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Function to handle login button press
  const handleLogin = () => {
    setModalVisible(true);
  };

  // Function to handle successful login
  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    setModalVisible(false);

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        await SecureStore.setItemAsync('isLoggedIn', 'true');
      }
    } catch (error) {
      console.error('Failed to save login state', error);
    }
  };

  // Function to start all sensors
  const startAllSensors = () => {
    setIsAllSensorsActive(true);
  };

  // Function to stop all sensors
  const stopAllSensors = () => {
    setIsAllSensorsActive(false);
  };

  // Display loading indicator if data is still loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // Use ParallaxScrollView for the main content
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.jpg')}
          style={styles.bannerLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! Users</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sysmatics Lab App</ThemedText>
        {isLoggedIn ? (
          <>
            <ThemedText>Welcome to sensor collection</ThemedText>
            {/* Button to start or stop all sensors */}
            <Button title={isAllSensorsActive ? "Stop All Sensors" : "Start All Sensors"} onPress={isAllSensorsActive ? stopAllSensors : startAllSensors} />
            <View style={styles.sensorContainer}>
              <ThemedText type="subtitle">Accelerometer Data</ThemedText>
              <AccelerometerSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Gyroscope Data</ThemedText>
              <GyroscopeSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Magnetometer Data</ThemedText>
              <MagnetometerSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Barometer Data</ThemedText>
              <BarometerSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Light Sensor Data</ThemedText>
              <LightSensorComponent isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Pedometer Data</ThemedText>
              <PedometerSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />

              <ThemedText type="subtitle">Device Motion Data</ThemedText>
              <DeviceMotionSensor isAllSensorsActive={isAllSensorsActive} />
              <View style={styles.spacer} />
            </View>
          </>
        ) : (
          <>
            <ThemedText>
              Our app is a vital tool developed for the Sysmatics Lab at IISER Bhopal, providing researchers with reliable data collection and logging capabilities. The integration of advanced technologies ensures that the app meets the high standards required for scientific research.
            </ThemedText>
            <ThemedText>
              Thank you for choosing our app for your sensor data collection needs. We are committed to providing you with a seamless and efficient experience.
            </ThemedText>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </>
        )}
        <LoginScreen
          visible={modalVisible}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setModalVisible(false)}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Define styles for the HomeScreen component
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  bannerLogo: {
    width: screenWidth,
    height: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  spacer: {
    height: 20,
  },
  loginButton: {
    backgroundColor: '#1D3D47',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  sensorContainer: {
    marginTop: 20,
  },
});
