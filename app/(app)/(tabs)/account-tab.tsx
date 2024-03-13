// import { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";

// import { SignedInContext } from "../../../context/SignedInContext";

export default function AccountTab({ navigation }) {
  // const [isSignedIn, setIsSignedIn] = useContext(SignedInContext);

  return (
    <View style={styles.container}>
      <Link asChild href="/donation-history">
        <TouchableOpacity>
          <Text>Donation History</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/profile">
        <TouchableOpacity>
          <Text>Profile</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/settings">
        <TouchableOpacity>
          <Text>Settings</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/about">
        <TouchableOpacity>
          <Text>About</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/help">
        <TouchableOpacity>
          <Text>Help</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild replace href="/login">
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
});
