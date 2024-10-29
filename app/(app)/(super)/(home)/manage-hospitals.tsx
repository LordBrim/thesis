import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { deleteHospital, getHospitals } from "rtx/slices/hospitals";
import IconBtn from "components/common/IconButton";
import { router, useNavigation } from "expo-router";

export default function ManageHospitals() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getHospitals());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBtn
          icon="plus"
          size={18}
          onPress={() =>
            router.push("(app)/(super)/(home)/manage-hospitals-create")
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode="never" persistentScrollbar={true}>
        <FlatList
          data={hospitals}
          renderItem={({ item }) => (
            <HospitalCard
              name={item.name}
              logoUrl={item.logoUrl}
              address={item.address}
              contactNumber={item.contactNumber}
              coordinates={item.coordinates}
              stock={item.stock}
            />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 16 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type IHospitalCard = {
  name: string;
  logoUrl: string;
  address: string;
  contactNumber: string;
  coordinates: CoordinatesState;
  stock: Array<StockState>;
};

interface CoordinatesState {
  latitude: number;
  longtitude: number;
}

interface StockState {
  type: string;
  available: boolean;
}

export function HospitalCard({
  name,
  logoUrl,
  address,
  contactNumber,
  coordinates,
  stock,
}: IHospitalCard) {
  const handleUpdate = (name) => {
    router.push({
      pathname: "(app)/(super)/(home)/manage-hospitals-update",
      params: { name: name.toString() },
    });
  };

  const dispatch = useDispatch();

  const handleDelete = (name) => {
    dispatch(
      deleteHospital({
        name: name,
      })
    );
    // deleteQuestionInFirebase(name);
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Pressable style={card.tContainer} android_ripple={{ radius: 250 }}>
        <Text style={[GS.h3, card.name]}>{name}</Text>
        <IconBtn icon="pencil" size={18} onPress={() => handleUpdate(name)} />
        <IconBtn
          icon="trash"
          size={18}
          onPress={() => handleDelete(name)}
          color="red"
        />
      </Pressable>
      <View style={card.bContainer}>
        <Text style={card.detail}>
          Address:<Text style={{ fontWeight: "normal" }}> {address}</Text>
        </Text>
        <Text style={card.detail}>
          Contact Number:
          <Text style={{ fontWeight: "normal" }}> {contactNumber}</Text>
        </Text>
        <Text style={card.detail}>Coordinates:</Text>
        <Text style={card.detail}>
          {"\t\t\t\t"}Latitude:
          <Text style={{ fontWeight: "normal" }}> {coordinates.latitude}</Text>
        </Text>
        <Text style={card.detail}>
          {"\t\t\t\t"}Longtitude:
          <Text style={{ fontWeight: "normal" }}>
            {" "}
            {coordinates.longtitude}
          </Text>
        </Text>
        <Text style={card.detail}>Stock:</Text>
        {stock.map((item, index) => (
          <Text style={card.detail} key={index}>
            {"\t\t\t\t"}
            {item.type}:
            <Text style={{ fontWeight: "normal" }}>
              {" "}
              {item.available ? "true" : "false"}
            </Text>
          </Text>
        ))}
      </View>
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

const card = StyleSheet.create({
  tContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    padding: 2,
  },
  name: {
    flex: 1,
    paddingVertical: 8,
  },
  bContainer: {
    minHeight: 35,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  detail: {
    flex: 1,
    fontWeight: "bold",
  },
});
