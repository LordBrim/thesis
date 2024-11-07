import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
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
import { Pressable } from "react-native";

export default function ManageBloodUnits() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => (
          <BloodUnitsCard
            uuid={item.uuid}
            title={item.name}
            stock={item.stock}
          />
        )}
        persistentScrollbar={true}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
}

interface IBloodUnitsCard {
  uuid?: string;
  title: string;
  stock: Array<IBloodUnit>;
}

interface IBloodUnit {
  type: string;
  available: boolean;
}

function BloodUnitsCard({ uuid, title, stock }: IBloodUnitsCard) {
  const size = 40;
  const [isEnabledAplus, toggleAplus] = useState(stock[0].available);
  const [isEnabledAminus, toggleAminus] = useState(stock[1].available);
  const [isEnabledBplus, toggleBplus] = useState(stock[2].available);
  const [isEnabledBminus, toggleBminus] = useState(stock[3].available);
  const [isEnabledABplus, toggleABplus] = useState(stock[4].available);
  const [isEnabledABminus, toggleABminus] = useState(stock[5].available);
  const [isEnabledOplus, toggleOplus] = useState(stock[6].available);
  const [isEnabledOminus, toggleOminus] = useState(stock[7].available);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      updateHospitalStock({
        uuid: uuid,
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
    updateHospitalStockByUuid(uuid, [
      { type: "A+", available: isEnabledAplus },
      { type: "A-", available: isEnabledAminus },
      { type: "B+", available: isEnabledBplus },
      { type: "B-", available: isEnabledBminus },
      { type: "AB+", available: isEnabledABplus },
      { type: "AB-", available: isEnabledABminus },
      { type: "O+", available: isEnabledOplus },
      { type: "O-", available: isEnabledOminus },
    ]);
  };

  return (
    <View style={card.container}>
      <View style={card.header}>
        <Text style={[GS.h3, card.title]}>{title}</Text>
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
      </View>
      <View style={card.row}>
        {/* Type A */}
        <View style={card.column}>
          <Pressable
            style={card.blood}
            onPress={() => toggleAplus(!isEnabledAplus)}
          >
            <Text style={card.detail}>A+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledAplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={card.blood}
            onPress={() => toggleAminus(!isEnabledAminus)}
          >
            <Text style={card.detail}>A-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledAminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type B */}
        <View style={card.column}>
          <Pressable
            style={card.blood}
            onPress={() => toggleBplus(!isEnabledBplus)}
          >
            <Text style={card.detail}>B+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledBplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={card.blood}
            onPress={() => toggleBminus(!isEnabledBminus)}
          >
            <Text style={card.detail}>B-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledBminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type AB */}
        <View style={card.column}>
          <Pressable
            style={card.blood}
            onPress={() => toggleABplus(!isEnabledABplus)}
          >
            <Text style={card.detail}>AB+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledABplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={card.blood}
            onPress={() => toggleABminus(!isEnabledABminus)}
          >
            <Text style={card.detail}>AB-</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledABminus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
        </View>
        {/* Type O */}
        <View style={card.column}>
          <Pressable
            style={card.blood}
            onPress={() => toggleOplus(!isEnabledOplus)}
          >
            <Text style={card.detail}>O+</Text>
            <Fontisto
              name="blood"
              size={size}
              color={isEnabledOplus ? COLORS.primary : COLORS.grayMid}
            />
          </Pressable>
          <Pressable
            style={card.blood}
            onPress={() => toggleOminus(!isEnabledOminus)}
          >
            <Text style={card.detail}>O-</Text>
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
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    gap: 8,
  },
  title: {
    flex: 1,
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
