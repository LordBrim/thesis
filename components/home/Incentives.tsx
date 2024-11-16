import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "constants/theme";
import LinkBtn from "components/common/LinkBtn";
import { useNavigation } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
import { GS } from "constants/style";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import {
  getHospitals,
  HospitalsState,
  HospitalState,
} from "rtx/slices/hospitals";

export default function Incentives() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find(
    (section) => section.name === user.lastDonationName
  );
  // TODO: Get the incentives of the hospital based on last donation
  const userIncentives = user.incentives;
  const hospitalIncentives = hospitals.find(
    (section) => section.name === user.lastDonationName
  )?.incentives;
  const data = Array.from(
    { length: hospitalIncentives.number || 0 },
    (_, i) => {
      const items =
        hospitalIncentives.data.filter((item) => item.position === i + 1) || [];
      const uniqueIncentives = [
        ...new Set(items.map((item) => item.incentive)),
      ];
      return {
        incentiveNo: i + 1,
        incentive:
          uniqueIncentives.length > 0 ? uniqueIncentives.join(", ") : null,
      };
    }
  );
  const size = 40;
  const [simulation, setSimulation] = useState(hospitalIncentives.number);
  return (
    <View style={{ gap: 24 }}>
      <View style={styles.bar}>
        <Text style={styles.title}>Incentives</Text>
        {/* TODO: All incentives are great but we first need to display the active incentives. */}
        {/* <LinkBtn
          label="View All"
          onPress={() =>
            navigation.navigate("(app)/(user)/(home)/all-incentives")
          }
          linkStyle={{ color: "black", textDecorationLine: "none" }}
        /> */}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image width={70} height={70} source={{ uri: hospital?.logoUrl }} />
          <View
            style={{
              flexDirection: "column",
              flexShrink: 1,
              justifyContent: "center",
              marginLeft: 12,
            }}
          >
            <Text style={[GS.h3, styles.title]}>{hospital?.name}</Text>
            {hospitalIncentives?.info && <Text>{hospitalIncentives.info}</Text>}
          </View>
        </View>
      </View>
      {data.length < 5 && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: 70,
                gap: 4,
                minHeight: 90,
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
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  {item.incentive}
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={4}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 12,
          }}
          scrollEnabled={false}
        />
      )}
      {(data.length == 5 || data.length == 6) && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: 70,
                gap: 4,
                minHeight: 90,
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
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  {item.incentive}
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={3}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 12,
          }}
          scrollEnabled={false}
        />
      )}
      {(data.length == 7 || data.length == 8) && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: 70,
                gap: 4,
                minHeight: 90,
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
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  {item.incentive}
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={4}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 12,
          }}
          scrollEnabled={false}
        />
      )}
      {(data.length == 9 || data.length == 10) && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: 70,
                gap: 4,
                minHeight: 90,
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
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  {item.incentive}
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          numColumns={5}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 12,
          }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
  },
});
