import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../firebase/storage";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    console.log(imageUri);
  };

  const handleRegistration = () => {
    // Handle the registration logic (e.g., validation, API call, etc.)
    uploadImage(imageUri, name).then(() => {
      console.log("done");
    });
    console.log("Name:", name);
    console.log("Image URI:", imageUri);
    // Note: Implement the registration logic here.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity
          onPress={async () => pickImage()}
          style={styles.imagePicker}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text>Select a Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>
      <Button title="Register" onPress={handleRegistration} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePicker: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e4e4",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});

export default RegisterScreen;
