import React, { useState, useEffect } from 'react';
import { Magnetometer } from 'expo-sensors';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { getFormattedTimestamp } from '../(utils)/timeStamp'; // Importing utility function for formatted timestamp

// Component for Magnetometer Sensor
const MagnetometerSensor = ({ isAllSensorsActive }) => {
  // State variables
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const colorScheme = useColorScheme(); // Custom hook for color scheme

  // Effect to check sensor availability
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await Magnetometer.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

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
      Magnetometer.setUpdateInterval(1000);
      const newSubscription = Magnetometer.addListener(magnetometerData => {
        setData(magnetometerData);
        setTimestamp(getFormattedTimestamp());
      });
      setSubscription(newSubscription);
      setIsSensorActive(true);
    }
  };

  // Function to stop the sensor
  const stopSensor = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
      setIsSensorActive(false);
    }
  };

  // Dynamic styles based on color scheme
  const dynamicStyles = styles(colorScheme);

  // Display message if sensor is not available on the device
  if (!isAvailable) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Magnetometer is not available on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.sensorText}>Timestamp: {timestamp}</Text>
      <Text style={dynamicStyles.sensorText}>x: {data.x.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>y: {data.y.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>z: {data.z.toFixed(3)}</Text>
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

export default MagnetometerSensor;
