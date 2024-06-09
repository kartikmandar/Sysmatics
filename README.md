# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# Project Overview

## Purpose
This project is developed as a vital tool for the Sysmatics Lab at IISER Bhopal, aimed at providing researchers with reliable data collection and logging capabilities using various sensors available on mobile devices. The integration of advanced technologies ensures that the app meets the high standards required for scientific research.

## Features
The app utilizes multiple sensors to collect and display data. Here is an overview of each sensor's functionality:

### Accelerometer
- Measures acceleration along the x, y, and z axes.
- Displays real-time data updates.
- Includes start and stop functionalities for the sensor.

### Gyroscope
- Measures the rate of rotation around the x, y, and z axes.
- Displays real-time data updates.
- Includes start and stop functionalities for the sensor.

### Magnetometer
- Measures the magnetic field along the x, y, and z axes.
- Displays real-time data updates.
- Includes start and stop functionalities for the sensor.

### Barometer
- Measures atmospheric pressure.
- Displays real-time pressure data.
- On iOS devices, it also displays relative altitude.
- Includes start and stop functionalities for the sensor.

### Light Sensor
- Measures ambient light levels (illuminance).
- Displays real-time light data.
- Available only on Android devices.
- Includes start and stop functionalities for the sensor.

### Pedometer
- Measures the number of steps taken.
- Displays the current step count and the step count for the last 24 hours.
- Includes start and stop functionalities for the sensor.

### Device Motion
- Measures acceleration, acceleration including gravity, rotation, and rotation rate.
- Displays real-time motion data.
- Includes start and stop functionalities for the sensor.

## Global Start/Stop Functionality
The app includes a feature to start and stop all sensors simultaneously. This is controlled by a button on the home screen, which toggles the active state of all sensors.

## Login Screen
The app includes a login screen where users can enter their details such as age, email, and gender. The data is saved securely using Expo SecureStore for persistent storage.

## Tab Layout
The app features a tab layout with the following tabs:

- Home
- Info
- Settings
- Surveys

Each tab is represented with an icon and provides specific functionalities related to the app's purpose.

## Development
To develop and test the project:

1. Follow the "Get started" section above to install dependencies and start the app.
2. Edit the files inside the app directory to modify the project's features and functionalities.

This project demonstrates the power of combining Expo and React Native to create a robust and versatile mobile application for scientific research.


