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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  updateHospitalStock,
  updateHospitalStockByUuid,
} from "rtx/slices/hospitals";

export default function ManageBloodUnits() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find(
    (section) => section.name === user.hospitalName
  );
  const navigation = useNavigation();
  const size = 40;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Blood Units",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
      },
      headerTitleAlign: "center",
    });
  }, []);
  const [isEnabledAplus, toggleAplus] = useState(hospital.stock[0].available);
  const [isEnabledAminus, toggleAminus] = useState(hospital.stock[1].available);
  const [isEnabledBplus, toggleBplus] = useState(hospital.stock[2].available);
  const [isEnabledBminus, toggleBminus] = useState(hospital.stock[3].available);
  const [isEnabledABplus, toggleABplus] = useState(hospital.stock[4].available);
  const [isEnabledABminus, toggleABminus] = useState(
    hospital.stock[5].available
  );
  const [isEnabledOplus, toggleOplus] = useState(hospital.stock[6].available);
  const [isEnabledOminus, toggleOminus] = useState(hospital.stock[7].available);
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
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Save</Text>
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
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      updateHospitalStock({
        uuid: hospital.uuid.toString(),
        updatedStock: [
          { type: "A+", available: isEnabledAplus },
          { type: "A-", available: isEnabledAminus },
          { type: "B+", available: isEnabledBplus },
          { type: "B-", available: isEnabledBminus },
          { type: "AB+", available: isEnabledABplus },
          { type: "AB-", available: isEnabledABminus },
          { type: "O+", available: isEnabledOplus },
          { type: "O-", available: isEnabledOminus },
        ],
      })
    );
    updateHospitalStockByUuid(hospital.uuid.toString(), [
      { type: "A+", available: isEnabledAplus },
      { type: "A-", available: isEnabledAminus },
      { type: "B+", available: isEnabledBplus },
      { type: "B-", available: isEnabledBminus },
      { type: "AB+", available: isEnabledABplus },
      { type: "AB-", available: isEnabledABminus },
      { type: "O+", available: isEnabledOplus },
      { type: "O-", available: isEnabledOminus },
    ]);
    navigation.goBack();
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
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
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
    fontFamily: "Poppins_700Bold",
  },
});
