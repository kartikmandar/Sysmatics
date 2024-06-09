import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { getFormattedTimestamp } from '../(utils)/timeStamp';

const PedometerSensor = () => {
  const [currentSteps, setCurrentSteps] = useState(0);
  const [last24HoursSteps, setLast24HoursSteps] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await Pedometer.isAvailableAsync();
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
      const newSubscription = Pedometer.watchStepCount(result => {
        setCurrentSteps(result.steps);
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

  const getLast24HoursSteps = async () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    const result = await Pedometer.getStepCountAsync(start, end);
    if (result) {
      setLast24HoursSteps(result.steps);
    }
  };

  const dynamicStyles = styles(colorScheme);

  if (!isAvailable) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Pedometer is not available on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.sensorText}>Timestamp: {timestamp}</Text>
      <Text style={dynamicStyles.sensorText}>Current Steps: {currentSteps}</Text>
      <Text style={dynamicStyles.sensorText}>Steps in Last 24 Hours: {last24HoursSteps}</Text>
      <View style={dynamicStyles.buttonRow}>
        <Button title="Start Sensor" onPress={startSensor} disabled={isSensorActive} />
        <Button title="Stop Sensor" onPress={stopSensor} disabled={!isSensorActive} />
      </View>
      <Button title="Get Last 24 Hours Steps" onPress={getLast24HoursSteps} />
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
    marginBottom: 10,
  },
});

export default PedometerSensor;
