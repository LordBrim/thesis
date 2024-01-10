import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the next screen here
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the next screen here
      Alert.alert("Welcome", "You have successfully logged in.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Account</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Log In" onPress={logIn} />
    </View>
  );
};

export default Account;
