import React, { useState, useEffect } from 'react';
import { Barometer } from 'expo-sensors';
import { View, Text, Button, StyleSheet, useColorScheme, Platform } from 'react-native';
import { getFormattedTimestamp } from '../(utils)/timeStamp';

const BarometerSensor = () => {
  const [data, setData] = useState({ pressure: 0, relativeAltitude: null });
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await Barometer.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  const startSensor = () => {
    if (isAvailable) {
      Barometer.setUpdateInterval(1000);
      const newSubscription = Barometer.addListener(barometerData => {
        setData({
          pressure: barometerData.pressure ?? 0,
          relativeAltitude: barometerData.relativeAltitude ?? null,
        });
        setTimestamp(getFormattedTimestamp());
      });
      setSubscription(newSubscription);
      setIsSensorActive(true);
    }
  };

  const stopSensor = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
      setIsSensorActive(false);
    }
  };

  const dynamicStyles = styles(colorScheme);

  if (!isAvailable) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.sensorText}>Barometer is not available on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.sensorText}>Timestamp: {timestamp}</Text>
      <Text style={dynamicStyles.sensorText}>Pressure: {data.pressure.toFixed(3)} hPa</Text>
      {Platform.OS === 'ios' ? (
        data.relativeAltitude !== null ? (
          <Text style={dynamicStyles.sensorText}>Relative Altitude: {data.relativeAltitude.toFixed(3)} m</Text>
        ) : (
          <Text style={dynamicStyles.sensorText}>Relative Altitude: Not available on this device.</Text>
        )
      ) : (
        <Text style={dynamicStyles.sensorText}>Relative Altitude: Not available on Android devices.</Text>
      )}
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

export default BarometerSensor;
