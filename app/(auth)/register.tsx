import { FIREBASE_AUTH } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";
import { Ionicons } from "react-native-vector-icons";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";

export default function Register() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Registration Failed:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>

      <View style={{ gap: 10 }}>
        <View style={styles.field}>
          <Text style={styles.formName}>Email Address</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter your email address"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.formName}>Password</Text>
          <View style={styles.formInput}>
            <TextInput
              style={{ width: "90%" }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={passwordVisibility}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically
            />
            <Pressable onPress={handlePasswordVisibility}>
              <Ionicons
                name={rightIcon}
                size={SIZES.xLarge}
                color={COLORS.gray}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <TouchableHighlight style={styles.formCta} onPress={() => register()}>
        <Text style={styles.formCtaText}>Register</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  field: {
    gap: SIZES.xxxSmall,
  },
  formName: {
    fontWeight: "bold",
  },
  formInput: {
    width: "100%",
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formCta: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  formCtaText: {
    fontSize: SIZES.medium,
    textTransform: "capitalize",
    color: COLORS.white,
  },
});
