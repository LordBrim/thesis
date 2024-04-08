import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { FAQuestions } from "../../../constants";
import QuestionPanel from "../../../components/faq/QuestionPanel";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import Divider from "../../../constants/divider";

const FAQ = () => {
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          We're here to help you with anything and everything on Lifeline!
        </Text>
        <Text style={styles.subText}>
          At Lifeline we like to help you to easily understand our app and how
          you can use it properly without any worries! Feel free to check
          answers for your questions.
        </Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={COLORS.redTop}
            // style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
      </View>

      <Text style={styles.titleHeader}>Help Desk</Text>
      {/* <Divider margin={5} /> */}

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
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  titleHeader: {
    // alignSelf: "flex-start",
    width: "90%",
    padding: 10,
    fontSize: SIZES.large,
  },
  headerContainer: {
    width: "100%",
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#a8a7a7",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginBottom: -10,
    borderRadius: 30,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    textAlign: "justify",
    fontWeight: "bold",
  },
  subText: {
    fontSize: SIZES.medium,
    textAlign: "justify",
    color: COLORS.gray,
  },
  searchInput: {
    // backgroundColor: "#f5f5f5",
    // marginBottom: 10,
  },
});
