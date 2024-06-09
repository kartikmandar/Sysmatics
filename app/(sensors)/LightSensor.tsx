import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { getFormattedTimestamp } from '../(utils)/timeStamp';

const LightSensorComponent = () => {
  const [data, setData] = useState({ illuminance: 0 });
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isAvailable, setIsAvailable] = useState(Platform.OS === 'android');
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await LightSensor.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();

    return () => {
      if (subscription) {
        subscription.remove();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [subscription, intervalId]);

  const startSensor = () => {
    if (isAvailable) {
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

  const dynamicStyles = styles(colorScheme);

  if (Platform.OS !== 'android') {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Light Sensor is not available on iOS devices.</Text>
      </View>
    );
  }

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
