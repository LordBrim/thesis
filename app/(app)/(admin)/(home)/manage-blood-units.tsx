import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useNavigation } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

export default function ManageBloodUnits() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital =
    hospitals.find((section) => section.name === user.hospitalName)?.stock ||
    [];
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
  const [isEnabledAplus, toggleAplus] = useState(hospital[0].available);
  const [isEnabledAminus, toggleAminus] = useState(hospital[1].available);
  const [isEnabledBplus, toggleBplus] = useState(hospital[2].available);
  const [isEnabledBminus, toggleBminus] = useState(hospital[3].available);
  const [isEnabledABplus, toggleABplus] = useState(hospital[4].available);
  const [isEnabledABminus, toggleABminus] = useState(hospital[5].available);
  const [isEnabledOplus, toggleOplus] = useState(hospital[6].available);
  const [isEnabledOminus, toggleOminus] = useState(hospital[7].available);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleUpdate}
        >
          <Text style={{ fontWeight: "bold" }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    isEnabledAplus,
    isEnabledAminus,
    isEnabledBplus,
    isEnabledBminus,
    isEnabledABplus,
    isEnabledABminus,
    isEnabledOplus,
    isEnabledOminus,
  ]);
  const handleUpdate = () => {
    console.log("Update");
  };
  return (
    <View style={styles.container}>
      <Text style={[GS.h3, styles.title]}>{user.hospitalName}</Text>
      <View style={styles.row}>
        {/* Type A */}
        <View style={styles.column}>
          <Pressable
            style={styles.blood}
            onPress={() => toggleAplus(!isEnabledAplus)}
          >
            <Text style={styles.detail}>A+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledAplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={styles.blood}
            onPress={() => toggleAminus(!isEnabledAminus)}
          >
            <Text style={styles.detail}>A-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledAminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type B */}
        <View style={styles.column}>
          <Pressable
            style={styles.blood}
            onPress={() => toggleBplus(!isEnabledBplus)}
          >
            <Text style={styles.detail}>B+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledBplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={styles.blood}
            onPress={() => toggleBminus(!isEnabledBminus)}
          >
            <Text style={styles.detail}>B-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledBminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type AB */}
        <View style={styles.column}>
          <Pressable
            style={styles.blood}
            onPress={() => toggleABplus(!isEnabledABplus)}
          >
            <Text style={styles.detail}>AB+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledABplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={styles.blood}
            onPress={() => toggleABminus(!isEnabledABminus)}
          >
            <Text style={styles.detail}>AB-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledABminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type O */}
        <View style={styles.column}>
          <Pressable
            style={styles.blood}
            onPress={() => toggleOplus(!isEnabledOplus)}
          >
            <Text style={styles.detail}>O+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledOplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={styles.blood}
            onPress={() => toggleOminus(!isEnabledOminus)}
          >
            <Text style={styles.detail}>O-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledOminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
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
    gap: 16,
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
