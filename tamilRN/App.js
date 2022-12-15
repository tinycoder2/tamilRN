import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Form from './screens/Form';
import CameraApp from './screens/CameraApp';
import Context from './context/Context';
import ImagePicker from './screens/ImagePicker';
import ImageForm from './screens/ImageForm';

function App() {
  return (
    <View style={{ ...styles.container, backgroundColor: "black" }}>
      {/* <Form /> */}
      <CameraApp />
      {/* <ImagePicker /> */}
      {/* <ImageForm /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  return (<Context>
    <App />
  </Context>)
};