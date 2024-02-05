import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from "react-native";

import useTogglePasswordVisibility from "../../../hooks/useTogglePasswordVisibility";
import { Ionicons } from "react-native-vector-icons";

import styles from "./login.style";

export default function Login() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View
          style={{
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.title}>Lifeline</Text>
            <Image
              style={styles.icon}
              source={require("../../../assets/splash/icon.png")}
            />
          </View>
          <Text style={styles.subtitle}>Bloodbank management system</Text>
        </View>

        <Text style={styles.header}>Log in</Text>
        <View style={{ gap: 10 }}>
          <View style={styles.field}>
            <Text style={styles.formName}>Email Address</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.formName}>Password</Text>
            <View style={styles.formInput}>
              <TextInput
                style={{ width: "90%" }}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Ionicons name={rightIcon} size={22} color="#83829A" />
              </Pressable>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.formName}>? Remember Me</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight style={styles.formCta}>
          {/* onPress={() => signIn({ email, password })} */}
          <Text style={styles.formCtaText}>Log In</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.containerBottom}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
