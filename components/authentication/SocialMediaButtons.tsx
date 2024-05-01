import { View, Text } from "react-native";
import React from "react";

export default function SignUpOptions() {
  return (
    <View>
      <Text>SignUpOptions</Text>

      {/* 
      <View style={{}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            height: 1,
            backgroundColor: "gray",
          }}
        >
          Or sign up with
        </Text>
      </View> */}

      {/* <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.signUpWith}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Link asChild href="/(tabs)">
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                  borderColor: COLORS.red,
                }}
              >
                <Ionicons name="logo-google" size={30} color={COLORS.red} />
              </TouchableOpacity>
            </Link>
            <Link asChild href="/(tabs)">
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                  borderColor: COLORS.red,
                }}
              >
                <Ionicons name="logo-facebook" size={30} color={COLORS.red} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View> */}
    </View>
  );
}
