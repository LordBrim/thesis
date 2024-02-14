import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function AdminDashboard({
  toManageBloodUnits,
  toManageEvents,
  toManageStaff,
  toManageUsers,
}) {
  return (
    <View style={styles.container}>
      <Text>Admin Dashboard</Text>
      <TouchableHighlight onPress={toManageBloodUnits}>
        <Text>Manage Blood Units</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={toManageEvents}>
        <Text>Manage Events</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={toManageStaff}>
        <Text>Manage Staff</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={toManageUsers}>
        <Text>Manage Users</Text>
      </TouchableHighlight>
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
