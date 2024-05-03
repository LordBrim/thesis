import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";
import Avatar from "components/common/Avatar";
import AccountCard from "components/account/AccountCard";

type IAccountTab = {
  avatarUrl: string;
  username: string;
  email: string;
  phoneNumber?: string;
};

export default function AccountTab({
  avatarUrl,
  username,
  email,
  phoneNumber,
}: IAccountTab) {
  // Temporary Data for front-end only. Remove later on firebase integration
  const temporaryData = {
    avaterUrl: "",
    username: "Username",
    email: "developer@gmail.com",
    phoneNumber: "+63 (212)-555-1234",
  };
  // Temporary Data for front-end only. Remove later on firebase integration

  return (
    <View style={styles.container}>
      <View style={styles.cProfile}>
        {/* <Avatar /> */}
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.username}>{temporaryData.username}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.email}>{temporaryData.email}</Text>
            {temporaryData.phoneNumber && (
              <Text style={styles.number}> • {temporaryData.phoneNumber}</Text>
            )}
          </View>
        </View>
      </View>

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

      <AccountCard href="login" icon="power-off" label="logout" />

      <AccountCard href="login" icon="power-off" label="logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  cProfile: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  cContact: {},
  username: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
  email: {},
  number: {},
});
