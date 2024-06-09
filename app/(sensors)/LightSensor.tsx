import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { getFormattedTimestamp } from '../(utils)/timeStamp'; // Importing utility function for formatted timestamp

// Component for Light Sensor
const LightSensorComponent = ({ isAllSensorsActive }) => {
  // State variables
  const [data, setData] = useState({ illuminance: 0 });
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isAvailable, setIsAvailable] = useState(Platform.OS === 'android');
  const colorScheme = useColorScheme(); // Custom hook for color scheme

  // Effect to check sensor availability
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await LightSensor.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();

    // Cleanup subscription and interval on unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [subscription, intervalId]);

  // Effect to handle global sensor start/stop
  useEffect(() => {
    if (isAllSensorsActive) {
      startSensor();
    } else {
      stopSensor();
    }
  }, [isAllSensorsActive]);

  // Function to start the sensor
  const startSensor = () => {
    if (isAvailable && !isSensorActive) {
      LightSensor.setUpdateInterval(1000);
      const newSubscription = LightSensor.addListener(lightSensorData => {
        setData({ illuminance: lightSensorData.illuminance });
      });
      setSubscription(newSubscription);
      
      const newIntervalId = setInterval(() => {
        setTimestamp(getFormattedTimestamp());
      }, 1000);
      setIntervalId(newIntervalId);
      
      setIsSensorActive(true);
    }
  };

  // Function to stop the sensor
  const stopSensor = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsSensorActive(false);
  };

  // Dynamic styles based on color scheme
  const dynamicStyles = styles(colorScheme);

  // Display message if sensor is not available on iOS
  if (Platform.OS !== 'android') {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Light Sensor is not available on iOS devices.</Text>
      </View>
    );
  }

  // Display message if sensor is not available on the device
  if (!isAvailable) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Light Sensor is not available on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.sensorText}>Timestamp: {timestamp}</Text>
      <Text style={dynamicStyles.sensorText}>Illuminance: {data.illuminance} lx</Text>
      <View style={dynamicStyles.buttonRow}>
        <Button title="Start Sensor" onPress={startSensor} disabled={isSensorActive} />
        <Button title="Stop Sensor" onPress={stopSensor} disabled={!isSensorActive} />
      </View>
    </View>
  );
};

// Styles for the component
const styles = (colorScheme: string) => StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  sensorText: {
    fontSize: 18,
    marginVertical: 5,
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});

export default LightSensorComponent;
