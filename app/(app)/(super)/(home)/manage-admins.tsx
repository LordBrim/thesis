import { AppDispatch, RootState } from "app/store";
import IconBtn from "components/common/IconButton";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { GS } from "constants/style";
import { COLORS } from "constants/theme";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  disableAdmins,
  disableAdminsInFirebase,
  getAllAdmins,
} from "rtx/unused/admins";

export default function ManageAdmins() {
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Admins",
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
            router.push("/(app)/(super)/(home)/manage-admins-create")
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
              <AdminsPanel hospitalName={item.name} />
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

function AdminsPanel({ hospitalName }) {
  const { admins } = useSelector((state: RootState) => state.admins);
  const hospitalAdmins = admins.filter(
    (adminsMember) => adminsMember.hospitalName === hospitalName
  );

  console.log(hospitalName);
  console.log(hospitalAdmins);
  return (
    <>
      {hospitalAdmins.length > 0 ? (
        hospitalAdmins.map((item, index) => (
          <AdminsCard
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
          <Text>There are no admins created.</Text>
        </View>
      )}
    </>
  );
}

type IAdminsCard = {
  uuid: string;
  disabled: boolean;
  displayName: string;
  email: string;
};

function AdminsCard({ uuid, disabled, displayName, email }: IAdminsCard) {
  const dispatch = useDispatch();
  const handleDisable = (uuid) => {
    dispatch(
      disableAdmins({
        uuid: uuid,
        disabled: !disabled,
      })
    );
    disableAdminsInFirebase(uuid, !disabled);
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
    fontWeight: "bold",
  },
});
