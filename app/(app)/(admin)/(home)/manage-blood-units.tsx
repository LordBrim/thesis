import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../../../../constants";
import { useNavigation } from "expo-router";

export default function ManageBloodUnits() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Blood Units",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Manage Blood Units</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
