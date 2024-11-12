import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { router, useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

export default function ManageIncentives() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find(
    (section) => section.name === user.hospitalName
  );
  const incentives = hospital?.incentives;
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
  const data = Array.from({ length: incentives.number }, (_, i) => {
    const items = incentives.data.filter((item) => item.position === i + 1);
    const uniqueIncentives = [...new Set(items.map((item) => item.incentive))];
    return {
      incentiveNo: i + 1,
      incentive:
        uniqueIncentives.length > 0 ? uniqueIncentives.join(", ") : null,
    };
  });
  const [simulation, setSimulation] = useState(incentives.number);
  const handleSimulation = () => {
    setSimulation(-1);
    const incrementSimulation = () => {
      setSimulation((prev) => {
        if (prev < incentives.number) {
          setTimeout(incrementSimulation, 1000);
          return prev + 1;
        }
        return prev;
      });
    };
    incrementSimulation();
  };
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
          <Text style={{ fontWeight: "bold" }}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const handleUpdate = () => {
    router.push("(app)/(admin)/(home)/manage-incentives-update");
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image width={70} height={70} source={{ uri: hospital.logoUrl }} />
            <View
              style={{
                flexDirection: "column",
                flexShrink: 1,
                justifyContent: "center",
                marginLeft: 12,
              }}
            >
              <Text style={[GS.h3, styles.title]}>
                {user.hospitalName} Incentives
              </Text>
              {incentives.info && <Text>{incentives.info}</Text>}
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
                  <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
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
                  <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
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
                  <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
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
                  <Text style={{ fontWeight: "bold" }}>{item.incentive}</Text>
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
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSimulation}
        >
          <Text style={{ fontWeight: "bold" }}>Simulate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
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
