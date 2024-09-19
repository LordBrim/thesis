import Title from "components/common/texts/Title";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

export default function AdminDashboard() {
  const size = 40;

  return (
    <View style={styles.container}>
      <Title title="Dashboard" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link asChild push href={"manage-staff"}>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome6
              name="user-nurse"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Staff</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-users"}>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome6
              name="user-injured"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Users</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-events"}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="calendar-outline"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Events</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-faq"}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="chatbubbles-outline"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>FAQ</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: 80,
    height: 80,
  },
  text: {
    fontWeight: "700",
  },
});
