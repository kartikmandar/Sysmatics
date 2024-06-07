import { Image, StyleSheet, Button, TouchableOpacity, Text, View, Modal, Dimensions, TextInput, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; // Secure storage for mobile devices
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Get the screen width to make responsive styles
const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  // State variables for modal visibility, age, email, and gender
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  // Load user data from storage when the component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        let savedAge, savedEmail, savedGender;
        if (Platform.OS === 'web') {
          // For web, use localStorage
          savedAge = localStorage.getItem('userAge');
          savedEmail = localStorage.getItem('userEmail');
          savedGender = localStorage.getItem('userGender');
        } else {
          // For mobile, use SecureStore
          savedAge = await SecureStore.getItemAsync('userAge');
          savedEmail = await SecureStore.getItemAsync('userEmail');
          savedGender = await SecureStore.getItemAsync('userGender');
        }

        // Set state with the loaded data
        if (savedAge) setAge(savedAge);
        if (savedEmail) setEmail(savedEmail);
        if (savedGender) setGender(savedGender);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    loadUserData();
  }, []);

  // Function to handle the login button press
  const handleLogin = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to handle changes in the age input
  const handleAgeChange = (text) => {
    // Ensure only digits are entered
    if (/^\d*$/.test(text)) {
      setAge(text);
    }
  };

  // Function to handle changes in the email input
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  // Function to validate the email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Function to show alerts on different platforms
  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      // For web, use the browser's alert
      alert(`${title}: ${message}`);
    } else {
      // For mobile, use React Native's Alert
      Alert.alert(title, message);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!age || !email || !gender) {
      showAlert('Incomplete Form', 'Please fill all the fields.');
      return;
    }
    // Validate the email format
    if (!validateEmail(email)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      // Save data to the appropriate storage
      if (Platform.OS === 'web') {
        localStorage.setItem('userAge', age);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userGender', gender);
      } else {
        await SecureStore.setItemAsync('userAge', age);
        await SecureStore.setItemAsync('userEmail', email);
        await SecureStore.setItemAsync('userGender', gender);
      }
      showAlert('Success', 'Your data has been saved.');
      closeModal();
    } catch (error) {
      showAlert('Error', 'Failed to save data.');
      console.error('Failed to save user data', error);
    }
  };

  return (
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
      </ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Please enter your details</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />
            <TextInput
              style={styles.inputAge}
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={handleAgeChange}
            />
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'male' && styles.genderButtonSelected,
                ]}
                onPress={() => setGender('male')}
              >
                <Text style={[
                  styles.genderButtonText,
                  gender === 'male' && styles.genderButtonTextSelected,
                ]}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'female' && styles.genderButtonSelected,
                ]}
                onPress={() => setGender('female')}
              >
                <Text style={[
                  styles.genderButtonText,
                  gender === 'female' && styles.genderButtonTextSelected,
                ]}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'other' && styles.genderButtonSelected,
                ]}
                onPress={() => setGender('other')}
              >
                <Text style={[
                  styles.genderButtonText,
                  gender === 'other' && styles.genderButtonTextSelected,
                ]}>Other</Text>
              </TouchableOpacity>
            </View>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputEmail: {
    width: 300,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputAge: {
    width: 300,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  genderLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    marginBottom: 20,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  genderButtonSelected: {
    backgroundColor: '#1D3D47',
    borderColor: '#1D3D47',
  },
  genderButtonText: {
    color: '#000000',
  },
  genderButtonTextSelected: {
    color: '#ffffff',
  },
});
