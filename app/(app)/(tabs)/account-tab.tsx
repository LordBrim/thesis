import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";
import Avatar from "components/common/Avatar";
import AccountCard from "components/account/AccountCard";
import { FlatList } from "react-native";

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

      <AccountCard
        href="/donation-history"
        icon="history"
        label="donation-history"
      />
      <AccountCard href="/profile" icon="person" label="profile" />
      <AccountCard href="/settings" icon="gear" label="settings" />
      <AccountCard href="/about" icon="info-circle" label="about" />
      <AccountCard href="/help" icon="question-circle" label="help" />
      <AccountCard
        href="/login"
        icon="power-off"
        label="logout"
        iconColor={COLORS.warning}
        labelColor={COLORS.warning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
