import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import styles from "./login.style";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const { signIn } = React.useContext(AuthContext);

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
            <TextInput
              style={styles.formInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
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
};

export default Login;
