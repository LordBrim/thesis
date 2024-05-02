import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { FAQuestions, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import QuestionPanel from "../../../components/faq/QuestionPanel";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import Divider from "../../../constants/divider";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import TextInputWrapper from "components/common/TextInputWrapper";

export default function FAQTab() {
  const [searchText, setSearchText] = useState("");
  const [isActiveIndex, setActiveIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(FAQuestions);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = FAQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(text.toLowerCase()) ||
        item.answer.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cTop}>
          <View style={{ gap: 8 }}>
            <Title title="If you have any questions on Lifeline, We're here to answer them the best we can! " />
            <Description
              description="At Lifeline we like to help you to easily understand our app and how
            you can use it properly without any worries! Feel free to check
            answers for your questions."
            />
          </View>

          <TextInputWrapper>
            <MaterialCommunityIcons name="magnify" size={24} color={"black"} />
            <TextInput
              placeholder="Find a question..."
              onChangeText={handleSearch}
              value={searchText}
              style={{ flex: 1 }}
            />
          </TextInputWrapper>
        </View>

        <View>
          {/* <Text style={styles.titleHeader}>Help Desk</Text> */}
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View>
                <QuestionPanel
                  question={item.question}
                  answer={item.answer}
                  isActive={isActiveIndex === item.id + 1}
                  onShow={() => {
                    setActiveIndex(item.id + 1);
                  }}
                  onHide={() => {
                    setActiveIndex(0);
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
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
    padding: HORIZONTAL_SCREEN_MARGIN,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  cTop: {
    width: "100%",
    backgroundColor: COLORS.white,
    fontWeight: "bold",
    gap: 16,
  },
});
