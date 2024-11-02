import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";

export default function ManageIncentives() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const incentives = hospitals.find(
    (section) => section.name === user.hospitalName
  ).incentives;
  const hospital = hospitals.find(
    (section) => section.name === user.hospitalName
  );
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Incentives",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
  const size = 40;
  const data = Array.from(
    { length: incentives.incentivesNo },
    (_, i) => i + 1
  ).map((number) => {
    const items = incentives.data.filter((item) => item.incentiveNo === number);
    const uniqueIncentives = [...new Set(items.map((item) => item.incentive))];
    return {
      incentiveNo: number,
      incentive: uniqueIncentives.length > 0 ? uniqueIncentives.join("") : null,
    };
  });
  const [isRepeatable, setIsRepeatable] = useState(incentives.repeatable);
  return (
    <View style={styles.container}>
      <Text style={[GS.h3, styles.title]}>{user.hospitalName} Incentives</Text>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
          backgroundColor: COLORS.slate100,
          padding: 16,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CircularProgress
            value={9}
            maxValue={incentives.incentivesNo}
            radius={35}
            activeStrokeColor={COLORS.primary}
            activeStrokeSecondaryColor={COLORS.accent}
            inActiveStrokeColor={COLORS.grayLight}
          />
          <View
            style={{ gap: 12, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold" }}>Repeatable?</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text>Yes</Text> */}
              <FontAwesome6
                name="repeat"
                size={30}
                color={false ? COLORS.success : COLORS.grayMid}
              />
            </View>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: 60,
                gap: 4,
              }}
            >
              <Text>{index + 1}</Text>
              <Fontisto
                name="blood"
                size={size}
                color={index + 1 <= 8 ? COLORS.primary : COLORS.grayMid}
              />
              {item.incentive && (
                <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={Math.round(data.length / 2)}
          contentContainerStyle={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            // borderWidth: 1,
          }}
          columnWrapperStyle={{}}
        />
      </View>
      <View
        style={{
          // borderWidth: 1,
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          padding: HORIZONTAL_SCREEN_MARGIN,
        }}
      >
        <FontAwesome6 name="circle-info" size={24} color={COLORS.primary} />
        <Text style={{ flex: 1 }}>{incentives.info}</Text>
      </View>
      <Text style={[GS.h3, styles.title]}>Simulate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    gap: 16,
  },
  scrollview: {},
  title: {
    minWidth: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});
