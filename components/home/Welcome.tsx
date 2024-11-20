import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SIZES, SPACES } from "../../constants/theme";
import ActionBtn from "./ActionBtn";

export default function Welcome({ toDonate, toRequest, currentUser }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>

      <View style={styles.buttons}>
        <ActionBtn
          href={toDonate}
          title="Donate"
          subtitle="Donate blood to someone in need."
          cta
          currentUser={currentUser}
          nextDonationDate={currentUser?.nextDonationDate}
        />
        <ActionBtn
          href={toRequest}
          title="Request"
          subtitle="Request blood from partenered hospitals."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: SPACES.sm,
  },
  buttons: {
    flexDirection: "row",
    gap: SPACES.sm,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
  },
});
