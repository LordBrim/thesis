import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useNavigation } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

export default function ManageBloodUnits() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();
  const size = 40;
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
      <Text style={[GS.h3, styles.title]}>{user.hospitalName}</Text>
      <View style={styles.row}>
        {/* Type A */}
        <View style={styles.column}>
          <View style={styles.blood}>
            <Text style={styles.detail}>A+</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
          <View style={styles.blood}>
            <Text style={styles.detail}>A-</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
        </View>
        {/* Type B */}
        <View style={styles.column}>
          <View style={styles.blood}>
            <Text style={styles.detail}>B+</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
          <View style={styles.blood}>
            <Text style={styles.detail}>B-</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
        </View>
        {/* Type AB */}
        <View style={styles.column}>
          <View style={styles.blood}>
            <Text style={styles.detail}>AB+</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
          <View style={styles.blood}>
            <Text style={styles.detail}>AB-</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
        </View>
        {/* Type O */}
        <View style={styles.column}>
          <View style={styles.blood}>
            <Text style={styles.detail}>O+</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
          <View style={styles.blood}>
            <Text style={styles.detail}>O-</Text>
            <Fontisto name="blood" size={size} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    gap: 24,
  },
  title: {
    minWidth: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  blood: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 55,
  },
  detail: {
    fontWeight: "bold",
  },
});
