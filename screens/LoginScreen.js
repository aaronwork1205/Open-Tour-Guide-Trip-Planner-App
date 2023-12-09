import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { signIn, signUp } from "../firebase/authentication";
import { useState } from "react";

const LoginScreen = ({ setRegister, setChosenEmail }) => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const onPressLogin = () => {
    signIn(email, pass);
  };

  const onPressSignUp = () => {
    setChosenEmail(email);
    setRegister(true);
    // signUp(email, pass);
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputBox}
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
      />
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.inputText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "80%",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#D3D3D3",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default LoginScreen;
