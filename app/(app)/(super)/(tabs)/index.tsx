import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { COLORS, SPACES } from "../../../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import {
  disableHospital,
  disableHospitalInFirebase,
  getHospitals,
} from "rtx/slices/hospitals";
import { Pressable } from "react-native";
import IconBtn from "components/common/IconButton";
import { router, useNavigation } from "expo-router";

export default function HomeTab() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getHospitals());
  }, [hospitals.length]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <FlatList
          data={hospitals}
          renderItem={({ item }) => (
            <HospitalCard
              uuid={item.uuid}
              disabled={item.disabled}
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
  disabled: boolean;
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

export function HospitalCard({
  uuid,
  disabled,
  name,
  logoUrl,
  address,
  contactNumber,
  coordinates,
}: IHospitalCard) {
  const handleUpdate = (uuid: string) => {
    router.push({
      pathname: "(app)/(super)/(home)/manage-hospitals-update",
      params: { uuid: uuid.toString() },
    });
  };
  const dispatch = useDispatch();
  const handleDisable = (uuid: string, disabled: boolean) => {
    if (!disabled) {
      Alert.alert(
        "Confirm Disable",
        "Are you sure you want to disable this hospital?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(
                disableHospital({
                  uuid: uuid,
                  disabled: !disabled,
                })
              );
              disableHospitalInFirebase(uuid, !disabled);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Confirm Reenable",
        "Are you sure you want to enable this hospital?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(
                disableHospital({
                  uuid: uuid,
                  disabled: !disabled,
                })
              );
              disableHospitalInFirebase(uuid, !disabled);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Pressable style={card.tContainer} android_ripple={{ radius: 250 }}>
        <Text style={[GS.h3, card.name]}>{name}</Text>
        <IconBtn icon="pencil" size={18} onPress={() => handleUpdate(uuid)} />
        <IconBtn
          icon="circle-minus"
          size={18}
          onPress={() => handleDisable(uuid, disabled)}
          color={disabled ? COLORS.grayMid : "red"}
        />
      </Pressable>
      <View style={card.bContainer}>
        <Text style={card.detail}>
          UUID:
          <Text style={{ fontFamily: "Poppins_400Regular" }}> {uuid}</Text>
        </Text>
        <Text style={card.detail}>
          Address:
          <Text style={{ fontFamily: "Poppins_400Regular" }}> {address}</Text>
        </Text>
        <Text style={card.detail}>
          Contact Number:
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {" "}
            {contactNumber}
          </Text>
        </Text>
        <Text style={card.detail}>Coordinates:</Text>
        <Text style={card.detail}>
          {"\t\t"}Latitude:
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {" "}
            {coordinates.latitude}
          </Text>
        </Text>
        <Text style={card.detail}>
          {"\t\t"}Longitude:
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {" "}
            {coordinates.longitude}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    gap: SPACES.xxl,
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
    fontFamily: "Poppins_700Bold",
  },
});
