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
import {
  deleteHospital,
  deleteHospitalInFirebase,
  getHospitals,
} from "rtx/slices/hospitals";
import IconBtn from "components/common/IconButton";
import { router, useNavigation } from "expo-router";

export default function ManageHospitals() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getHospitals());
  }, [hospitals]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Hospitals",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
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
              uuid={item.uuid}
              name={item.name}
              logoUrl={item.logoUrl}
              address={item.address}
              contactNumber={item.contactNumber}
              coordinates={item.coordinates}
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
  uuid: string;
  name: string;
  logoUrl: string;
  address: string;
  contactNumber: string;
  coordinates: CoordinatesState;
};

interface CoordinatesState {
  latitude: number;
  longitude: number;
}

interface StockState {
  type: string;
  available: boolean;
}

export function HospitalCard({
  uuid,
  name,
  logoUrl,
  address,
  contactNumber,
  coordinates,
}: IHospitalCard) {
  const handleUpdate = (uuid) => {
    router.push({
      pathname: "(app)/(super)/(home)/manage-hospitals-update",
      params: { uuid: uuid.toString() },
    });
  };

  const dispatch = useDispatch();

  const handleDelete = (uuid) => {
    dispatch(
      deleteHospital({
        uuid: uuid,
      })
    );
    deleteHospitalInFirebase(uuid);
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Pressable style={card.tContainer} android_ripple={{ radius: 250 }}>
        <Text style={[GS.h3, card.name]}>{name}</Text>
        <IconBtn icon="pencil" size={18} onPress={() => handleUpdate(uuid)} />
        <IconBtn
          icon="trash"
          size={18}
          onPress={() => handleDelete(uuid)}
          color="red"
        />
      </Pressable>
      <View style={card.bContainer}>
        <Text style={card.detail}>
          UUID:
          <Text style={{ fontWeight: "normal" }}> {uuid}</Text>
        </Text>
        <Text style={card.detail}>
          Address:<Text style={{ fontWeight: "normal" }}> {address}</Text>
        </Text>
        <Text style={card.detail}>
          Contact Number:
          <Text style={{ fontWeight: "normal" }}> {contactNumber}</Text>
        </Text>
        <Text style={card.detail}>Coordinates:</Text>
        <Text style={card.detail}>
          {"\t\t"}Latitude:
          <Text style={{ fontWeight: "normal" }}> {coordinates.latitude}</Text>
        </Text>
        <Text style={card.detail}>
          {"\t\t"}Longitude:
          <Text style={{ fontWeight: "normal" }}> {coordinates.longitude}</Text>
        </Text>
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
