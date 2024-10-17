import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FAQuestions, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import QuestionPanel from "../../../components/faq/QuestionPanel";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";
import Description from "../../../components/common/texts/Description";
import TextInputWrapper from "../../../components/common/TextInputWrapper";

export default function FAQTab() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([
    {
      id: 1,
      title: "Blood Donation",
    },
    { id: 2, title: "Blood" },
    { id: 3, title: "Other Questions" },
  ]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = FAQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(text.toLowerCase()) ||
        item.answer.toLowerCase().includes(text.toLowerCase())
    ).map((item) => ({ id: item.id, title: item.question }));
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.cTop}>
          <View style={{ gap: 8 }}>
            <Text style={GS.h1}>
              If you have any questions on Lifeline, We're here to answer them
              the best we can!
            </Text>

            <Description description="At Lifeline we like to help you to easily understand our app and how you can use it properly without any worries! Feel free to check answers for your questions." />
          </View>

          <TextInputWrapper>
            <TextInput
              placeholder="Find a question..."
              onChangeText={handleSearch}
              value={searchText}
              style={{ flex: 1 }}
            />
            <FontAwesome6 name="magnifying-glass" size={24} color={"black"} />
          </TextInputWrapper>
        </View>

        <View style={styles.panels}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <QuestionPanel title={item.title} />}
            keyExtractor={(item) => item.id.toString()}
            overScrollMode="never"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    fontWeight: "bold",
    gap: 16,
  },
  panels: {
    gap: 20,
  },
});
