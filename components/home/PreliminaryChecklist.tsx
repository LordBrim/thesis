import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import StepsIndicator from "components/common/StepsIndicator";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import ChecklistItem from "./ChecklistItem";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../constants";
import { DonationScreens, checklistQuestions } from "constants/database";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import ScheduleAppointmentScreen from "app/(app)/(home)/schedule-appointment";

export default function PreliminaryChecklist() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title title="Preliminary Checklist" />
        <Description description="Please answer the questions truthfully as you can possibly can." />
      </View>
      <View style={styles.bar}>
        <Text style={styles.header}>Questions</Text>
        <Text style={[styles.header, { paddingHorizontal: 8 }]}>Yes / No</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={checklistQuestions}
          renderItem={({ item }) => <ChecklistItem question={item.question} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="cancel"
          onPress={() => cancel}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label="next"
          onPress={() => router.push("(app)/(home)/schedule-appointment")}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  flatlist: {
    rowGap: 8,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  fixed: {
    flexDirection: "row",
    gap: 8,
  },
});
