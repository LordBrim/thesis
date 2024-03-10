// import { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";

// import { SignedInContext } from "../../../context/SignedInContext";

export default function AccountTab({ navigation }) {
  // const [isSignedIn, setIsSignedIn] = useContext(SignedInContext);

  return (
    <View style={styles.container}>
      <Link asChild push href="/DonationHistory">
        <TouchableOpacity>
          <Text>Donation History</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href="/Profile">
        <TouchableOpacity>
          <Text>Profile</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href="/Settings">
        <TouchableOpacity>
          <Text>Settings</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href="/About">
        <TouchableOpacity>
          <Text>About</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href="/Help">
        <TouchableOpacity>
          <Text>Help</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild replace href="/Login">
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
