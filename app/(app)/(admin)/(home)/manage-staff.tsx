import { AppDispatch, RootState } from "app/store";
import IconBtn from "components/common/IconButton";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { GS } from "constants/style";
import { COLORS } from "constants/theme";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  disableStaff,
  disableStaffInFirebase,
  getHopitalStaff,
} from "rtx/slices/staff";

export default function ManageStaff() {
  const { user } = useSelector((state: RootState) => state.user);
  const { staff } = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getHopitalStaff(user.hospitalName));
  }, [staff]);
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
      <ScrollView
        persistentScrollbar={true}
        overScrollMode="never"
        style={styles.scrollview}
      >
        <Text style={[GS.h3, styles.title]}>{user.hospitalName} Staff</Text>
        <FlatList
          data={staff}
          renderItem={({ item }) => (
            <StaffCard
              disabled={item.disabled}
              uuid={item.uuid}
              displayName={item.displayName}
              email={item.email}
            />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          overScrollMode="never"
          scrollEnabled={false}
          persistentScrollbar={true}
        />
      </ScrollView>
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
  // const handleUpdate = (uuid) => {
  //   router.push({
  //     pathname: "(app)/(admin)/(home)/manage-staff-update",
  //     params: {
  //       uuid: uuid,
  //     },
  //   });
  // };
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
  return (
    <>
      <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
        <Text style={[GS.h2, card.question]}>{displayName}</Text>
        {/* <IconBtn icon="pencil" size={18} onPress={() => handleUpdate(uuid)} /> */}
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
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
  },
  scrollview: {
    gap: 20,
  },
  title: {
    flex: 1,
    minWidth: "100%",
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
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
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
