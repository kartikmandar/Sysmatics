import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { getFormattedTimestamp } from '../(utils)/timeStamp';

const DeviceMotionSensor = () => {
  const [data, setData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationIncludingGravity: { x: 0, y: 0, z: 0 },
    rotation: { alpha: 0, beta: 0, gamma: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 }
  });
  const [timestamp, setTimestamp] = useState('');
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await DeviceMotion.isAvailableAsync();
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
      DeviceMotion.setUpdateInterval(1000);
      const newSubscription = DeviceMotion.addListener(deviceMotionData => {
        setData({
          acceleration: deviceMotionData.acceleration,
          accelerationIncludingGravity: deviceMotionData.accelerationIncludingGravity,
          rotation: deviceMotionData.rotation,
          rotationRate: deviceMotionData.rotationRate
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
        <Text style={dynamicStyles.sensorText}>Device Motion is not available on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.sensorText}>Timestamp: {timestamp}</Text>
      <Text style={dynamicStyles.sensorText}>Acceleration:</Text>
      <Text style={dynamicStyles.sensorText}>x: {data.acceleration.x.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>y: {data.acceleration.y.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>z: {data.acceleration.z.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>Acceleration Including Gravity:</Text>
      <Text style={dynamicStyles.sensorText}>x: {data.accelerationIncludingGravity.x.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>y: {data.accelerationIncludingGravity.y.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>z: {data.accelerationIncludingGravity.z.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>Rotation:</Text>
      <Text style={dynamicStyles.sensorText}>alpha: {data.rotation.alpha.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>beta: {data.rotation.beta.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>gamma: {data.rotation.gamma.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>Rotation Rate:</Text>
      <Text style={dynamicStyles.sensorText}>alpha: {data.rotationRate.alpha.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>beta: {data.rotationRate.beta.toFixed(3)}</Text>
      <Text style={dynamicStyles.sensorText}>gamma: {data.rotationRate.gamma.toFixed(3)}</Text>
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
    marginBottom: 10,
  },
});

export default DeviceMotionSensor;
