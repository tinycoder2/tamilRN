import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  TextInput,
} from "react-native";
import Constants from "expo-constants";

const baseUrl = "http://192.168.1.4:8000/testApp/reports/";

const Form = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTitleHandler = (title) => {
    setTitle(title);
  };

  const onChangeTextHandler = (text) => {
    setText(text);
  };

  const onSubmitFormHandler = async (event) => {
    if (!title.trim() || !text.trim()) {
      alert("data is invalid");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(baseUrl, {
        "title": title,
        "text": text
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        console.log(response.data)
        setIsLoading(false);
        setTitle('');
        setText('');
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.wrapper}>
          {isLoading ? (
            <Text style={styles.formHeading}> Creating resource </Text>
          ) : (
            <Text style={styles.formHeading}>Create new report</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={title}
            editable={!isLoading}
            onChangeText={onChangeTitleHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="text"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={text}
            editable={!isLoading}
            onChangeText={onChangeTextHandler}
          />
        </View>
        <View>
          <Button
            title="Submit"
            onPress={onSubmitFormHandler}
            style={styles.submitButton}
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  formHeading: {
    color: "#ffffff",
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    borderRadius: 20,
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "gray",
    padding: 100,
  },
});

export default Form