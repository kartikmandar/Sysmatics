// app/(tabs)/loginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Modal, Dimensions, Platform, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const { width: screenWidth } = Dimensions.get('window');

type LoginScreenProps = {
  visible: boolean;
  onLoginSuccess: () => void;
  onClose: () => void;
};

const LoginScreen = ({ visible, onLoginSuccess, onClose }: LoginScreenProps) => {
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        let savedAge, savedEmail, savedGender;
        if (Platform.OS === 'web') {
          savedAge = localStorage.getItem('userAge');
          savedEmail = localStorage.getItem('userEmail');
          savedGender = localStorage.getItem('userGender');
        } else {
          savedAge = await SecureStore.getItemAsync('userAge');
          savedEmail = await SecureStore.getItemAsync('userEmail');
          savedGender = await SecureStore.getItemAsync('userGender');
        }

        if (savedAge) setAge(savedAge);
        if (savedEmail) setEmail(savedEmail);
        if (savedGender) setGender(savedGender);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    loadUserData();
  }, []);

  const handleAgeChange = (text: React.SetStateAction<string>) => {
    if (/^\d*$/.test(text)) {
      setAge(text);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = async () => {
    if (!age || !email || !gender) {
      showAlert('Incomplete Form', 'Please fill all the fields.');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
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
      onLoginSuccess();
    } catch (error) {
      showAlert('Error', 'Failed to save data.');
      console.error('Failed to save user data', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
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
              style={[styles.genderButton, gender === 'male' && styles.genderButtonSelected]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.genderButtonText, gender === 'male' && styles.genderButtonTextSelected]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'female' && styles.genderButtonSelected]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.genderButtonText, gender === 'female' && styles.genderButtonTextSelected]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'other' && styles.genderButtonSelected]}
              onPress={() => setGender('other')}
            >
              <Text style={[styles.genderButtonText, gender === 'other' && styles.genderButtonTextSelected]}>Other</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: screenWidth * 0.6 }}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default LoginScreen;
