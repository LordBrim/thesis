import { RootState } from "app/store";
import IconBtn from "components/common/IconButton";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { GS } from "constants/style";
import { COLORS } from "constants/theme";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getHopitalStaff } from "rtx/slices/staff";

export default function ManageStaff() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHopitalStaff(user.hospitalName));
  }, []);
  const { staff } = useSelector((state: RootState) => state.staff);

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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView persistentScrollbar={true} overScrollMode="never">
        <Text style={[GS.h3, styles.title]}>{user.hospitalName}</Text>
        <FlatList
          data={staff}
          renderItem={({ item }) => (
            <StaffCard
              title={user.hospitalName}
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
  title: string;
  displayName: string;
  email: string;
};

export function StaffCard({ title, displayName, email }: IStaffCard) {
  const handleUpdate = (title, question, answer) => {
    // router.push({
    //   pathname: "(app)/(admin)/(home)/manage-faq-update",
    //   params: {
    //     title: title.toString(),
    //     question: question.toString(),
    //     answer: answer.toString(),
    //   },
    // });
  };
  // const dispatch = useDispatch();
  const handleDelete = (title, deletedQuestion) => {
    // dispatch(
    //   deleteQuestion({
    //     title: title,
    //     deletedQuestion: deletedQuestion,
    //   })
    // );
    // deleteQuestionInFirebase(title, deletedQuestion);
  };
  return (
    <>
      <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
        <Text style={card.question}>{displayName}</Text>
        {/* <IconBtn
          icon="pencil"
          size={18}
          onPress={() => handleUpdate(title, question, answer)}
        />
        <IconBtn
          icon="trash"
          size={18}
          onPress={() => handleDelete(title, { question, answer })}
          color="red"
        /> */}
      </Pressable>
      <View style={card.aContainer}>
        <Text style={card.answer}>{email}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
  },
});
