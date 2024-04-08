import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminDashboard({
  toManageBloodUnits,
  toManageEvents,
  toManageStaff,
  toManageUsers,
}) {
  return (
    <View style={styles.container}>
      <Text>Admin Dashboard</Text>

      <Link asChild push href={toManageBloodUnits}>
        <TouchableOpacity>
          <Text>Manage Blood Units</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href={toManageEvents}>
        <TouchableOpacity>
          <Text>Manage Events</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href={toManageStaff}>
        <TouchableOpacity>
          <Text>Manage Staff</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild push href={toManageUsers}>
        <TouchableOpacity>
          <Text>Manage Users</Text>
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
  },
});
