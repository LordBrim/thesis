import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { SafeAreaView } from "react-native";

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
  const [simulation, setSimulation] = useState(incentives.incentivesNo);

  const handleSimulation = () => {
    setSimulation(-1);
    const incrementSimulation = () => {
      setSimulation((prev) => {
        if (prev < incentives.incentivesNo) {
          setTimeout(incrementSimulation, 1000);
          return prev + 1;
        }
        return prev;
      });
    };
    incrementSimulation();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        overScrollMode="never"
        persistentScrollbar={true}
        contentContainerStyle={styles.scrollview}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {/* TODO: Show on user home screen */}
            {/* <CircularProgress
              value={9}
              maxValue={incentives.incentivesNo}
              radius={35}
              activeStrokeColor={COLORS.primary}
              activeStrokeSecondaryColor={COLORS.accent}
              inActiveStrokeColor={COLORS.grayLight}
            /> */}
            <Image width={70} height={70} source={{ uri: hospital.logoUrl }} />
            <View
              style={{
                flexDirection: "column",
                flexShrink: 1,
                justifyContent: "center",
                paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
              }}
            >
              <Text style={[GS.h3, styles.title]}>
                {user.hospitalName} Incentives
              </Text>
              <Text>{incentives.info}</Text>
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
                width: 70,
                gap: 4,
              }}
            >
              <Text>{index + 1}</Text>
              <Fontisto
                name="blood"
                size={size}
                color={
                  index + 1 <= simulation ? COLORS.primary : COLORS.grayMid
                }
              />
              {item.incentive && (
                <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={data.length > 5 ? Math.round(data.length / 2) : 5}
          contentContainerStyle={[
            data.length >= 4 ? styles.stockCenter : styles.stockLeft,
            {
              justifyContent: "space-between",
              gap: 12,
            },
          ]}
          columnWrapperStyle={{
            gap: 12,
            paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
          }}
          scrollEnabled={false}
        />
        <Button onPress={handleSimulation} title="Simulation" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    gap: 24,
  },
  scrollview: {
    gap: 24,
  },
  title: {
    minWidth: "100%",
  },
  stockLeft: {
    alignItems: "baseline",
  },
  stockCenter: {
    alignItems: "center",
  },
});
