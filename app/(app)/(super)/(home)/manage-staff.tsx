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
  getAllStaff,
} from "rtx/slices/staff";

export default function ManageStaff() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const { staff } = useSelector((state: RootState) => state.staff);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllStaff());
    console.log(staff);
  }, []);
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
        data={hospitals}
        renderItem={({ item }) => (
          <View>
            <Text style={[GS.h2, styles.title]}>{item.name}</Text>
            <StaffPanel hospitalName={item.name} />
          </View>
        )}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        overScrollMode="never"
        persistentScrollbar={true}
        contentContainerStyle={{ gap: 24, flex: 1 }}
      />
    </SafeAreaView>
  );
}

function StaffPanel({ hospitalName }) {
  const { staff } = useSelector((state: RootState) => state.staff);
  const hospitalStaff = staff.filter(
    (staffMember) => staffMember.hospitalName === hospitalName
  );
  return (
    <>
      {hospitalStaff.length > 0 ? (
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
      ) : (
        <View
          style={{
            paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
          }}
        >
          <Text>There are no staff created.</Text>
        </View>
      )}
    </>
  );
}

type IStaffCard = {
  uuid: string;
  disabled: boolean;
  displayName: string;
  email: string;
};

function StaffCard({ uuid, disabled, displayName, email }: IStaffCard) {
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
    <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
      <View style={card.aContainer}>
        <Text style={card.answer}>
          UUID:
          <Text style={{ fontWeight: "normal" }}> {uuid}</Text>
        </Text>
        <Text style={card.answer}>
          Display Name:
          <Text style={{ fontWeight: "normal" }}> {displayName}</Text>
        </Text>
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
      <View>
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
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
  },
  scrollview: {
    gap: 20,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 2,
  },
  aContainer: {
    width: "85%",
    minHeight: 35,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    padding: 8,
  },
  answer: {
    width: "100%",
    flexDirection: "row",
    fontWeight: "bold",
  },
});
