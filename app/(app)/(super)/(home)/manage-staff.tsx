import { AppDispatch, RootState } from "app/store";
import IconBtn from "components/common/IconButton";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { GS } from "constants/style";
import { COLORS } from "constants/theme";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  disableStaff,
  disableStaffInFirebase,
  getHospitalsStaff,
} from "rtx/slices/staff";

export default function ManageStaff() {
  const { staff } = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch<AppDispatch>();
  // TODO: Get all the hospital staff
  useEffect(() => {
    dispatch(getHospitalsStaff());
  }, []);

  // useEffect(() => {
  //   dispatch(getHopitalStaff(user.hospitalName));
  // }, [staff]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Staff",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBtn
          icon="plus"
          size={18}
          onPress={() =>
            router.push("/(app)/(admin)/(home)/manage-staff-create")
          }
        />
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staff}
        renderItem={({ item }) => (
          <View>
            <Text style={[GS.h3, styles.title]}>{item.hospitalName}</Text>
            <StaffCard
              disabled={item.disabled}
              uuid={item.uuid}
              displayName={item.displayName}
              email={item.email}
            />
          </View>
        )}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        overScrollMode="never"
        persistentScrollbar={true}
      />
    </SafeAreaView>
  );
}

type IStaffCard = {
  uuid: string;
  disabled: boolean;
  displayName: string;
  email: string;
};

export function StaffCard({ uuid, disabled, displayName, email }: IStaffCard) {
  const dispatch = useDispatch();
  const handleDisable = (uuid) => {
    dispatch(
      disableStaff({
        uuid: uuid,
        disabled: !disabled,
      })
    );
    disableStaffInFirebase(uuid, !disabled);
  };
  // TODO: Get the hospital staff based on hospital uuid
  return (
    <>
      <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
        <Text style={[GS.h3, styles.title]}>{displayName}</Text>
        {disabled ? (
          <IconBtn
            icon="circle-minus"
            size={18}
            color="gray"
            onPress={() => handleDisable(uuid)}
          />
        ) : (
          <IconBtn
            icon="circle-minus"
            size={18}
            color="red"
            onPress={() => handleDisable(uuid)}
          />
        )}
      </Pressable>
      <View style={card.aContainer}>
        <Text style={card.answer}>
          Disabled:
          <Text style={{ fontWeight: "normal" }}>
            {" "}
            {disabled ? "true" : "false"}
          </Text>
        </Text>
        <Text style={card.answer}>
          Email:<Text style={{ fontWeight: "normal" }}> {email}</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: HORIZONTAL_SCREEN_MARGIN,
  },
  scrollview: {
    gap: 20,
  },
  title: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  },
  question: {
    flex: 1,
    fontWeight: "bold",
  },
  aContainer: {
    width: "100%",
    minHeight: 35,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
    fontWeight: "bold",
  },
});
