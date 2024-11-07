import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { addEmptyIncentivesToAllHospitals } from "rtx/actions/initializers/ini-hospitals";

export default function ManageIncentives() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
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
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => (
          <IncentivesCard
            name={item.name}
            logoUrl={item.logoUrl}
            incentives={item.incentives}
          />
        )}
        persistentScrollbar={true}
        overScrollMode="never"
        contentContainerStyle={{ gap: 4 }}
      />
    </SafeAreaView>
  );
}

interface IIncentivesCard {
  name: string;
  logoUrl: string;
  incentives: IncentiveState;
}

interface IncentiveState {
  info: string;
  number: number;
  data: Array<IncentiveData>;
}

interface IncentiveData {
  position: number;
  incentive: string;
}

function IncentivesCard({ name, logoUrl, incentives }: IIncentivesCard) {
  const size = 40;
  const handleUpdate = () => {
    router.push("(app)/(admin)/(home)/manage-incentives-update");
  };
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
  return (
    <View style={card.container}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image width={70} height={70} source={{ uri: logoUrl }} />
          <View
            style={{
              flexDirection: "column",
              flexShrink: 1,
              justifyContent: "center",
              marginLeft: 12,
            }}
          >
            <Text style={[GS.h3, card.title]}>{name}</Text>
            {incentives.info && <Text>{incentives.info}</Text>}
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
              color={index + 1 <= simulation ? COLORS.primary : COLORS.grayMid}
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
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
          onPress={handleUpdate}
        >
          <Text style={{ fontWeight: "bold" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 90,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
          onPress={handleSimulation}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Simulate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: COLORS.background,
    paddingVertical: 16,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  scrollview: {
    gap: 24,
  },
  title: {
    minWidth: "100%",
  },
});
