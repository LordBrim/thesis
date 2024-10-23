import { View, ScrollView, FlatList, SafeAreaView, Text } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  FAQuestions,
  GS,
  HORIZONTAL_SCREEN_MARGIN,
} from "../../../../constants";
import QuestionPanel from "../../../../components/faq/QuestionPanel";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";
import Description from "../../../../components/common/texts/Description";
import TextInputWrapper from "../../../../components/common/TextInputWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getFAQs } from "rtx/slices/faq";

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

  const { faqs } = useSelector((state: RootState) => state.faqs);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFAQs());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode="never">
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

        {faqs.map((faqs) => (
          <View key={faqs.id}>
            <Text>{faqs.answer}</Text>
            <Text>{faqs.question}</Text>
          </View>
        ))}

        <View style={styles.panels}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <QuestionPanel title={item.title} />}
            keyExtractor={(item) => item.id.toString()}
            overScrollMode="never"
            scrollEnabled={false}
          />
        </View>

        <View style={styles.panels}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <QuestionPanel title={item.title} />}
            keyExtractor={(item) => item.id.toString()}
            overScrollMode="never"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontWeight: "bold",
    gap: 16,
  },
  panels: {
    gap: 20,
  },
});
