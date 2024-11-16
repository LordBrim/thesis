import { AppDispatch, RootState } from "app/store";
import IconBtn from "components/common/IconButton";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { GS } from "constants/style";
import { COLORS } from "constants/theme";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  disableStaff,
  disableStaffInFirebase,
  getAllStaff,
} from "rtx/slices/staff";

export default function ManageStaff() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllStaff());
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
            router.push("/(app)/(super)/(home)/manage-staff-create")
          }
        />
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        overScrollMode="never"
        persistentScrollbar={true}
        style={styles.scrollview}
      >
        <FlatList
          data={hospitals}
          renderItem={({ item }) => (
            <>
              <Text style={[GS.h2, styles.title]}>{item.name}</Text>
              <StaffPanel hospitalName={item.name} />
            </>
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          contentContainerStyle={{ gap: 24, paddingBottom: 16 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function StaffPanel({ hospitalName }) {
  const { staff } = useSelector((state: RootState) => state.staff);
  const hospitalStaff = staff.filter(
    (staffMember) => staffMember.hospitalName === hospitalName
  );

  console.log(hospitalName);
  console.log(hospitalStaff);
  return (
    <>
      {hospitalStaff.length > 0 ? (
        hospitalStaff.map((item, index) => (
          <StaffCard
            key={index}
            disabled={item.disabled}
            uuid={item.uuid}
            displayName={item.displayName}
            email={item.email}
          />
        ))
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
          <Text style={{ fontFamily: "Poppins_400Regular" }}> {uuid}</Text>
        </Text>
        <Text style={card.answer}>
          Display Name:
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {" "}
            {displayName}
          </Text>
        </Text>
        <Text style={card.answer}>
          Disabled:
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            {" "}
            {disabled ? "true" : "false"}
          </Text>
        </Text>
        <Text style={card.answer}>
          Email:
          <Text style={{ fontFamily: "Poppins_400Regular" }}> {email}</Text>
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
    flex: 1,
  },
  scrollview: {
    gap: 20,
    paddingTop: HORIZONTAL_SCREEN_MARGIN,
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
    fontFamily: "Poppins_700Bold",
  },
});
