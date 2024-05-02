import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  COLORS,
  SIZES,
  HORIZONTAL_SCREEN_MARGIN,
  FAQuestions,
} from "../../constants";
import QuestionCard from "./QuestionCard";
import { useState } from "react";

type IQuestionPanel = {
  title: string;
};

export default function QuestionPanel({ title }: IQuestionPanel) {
  const [isActiveIndex, setActiveIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(FAQuestions);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={filteredData}
        renderItem={({ item }) => (
          <QuestionCard
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
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.gray2,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 8,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  questions: {},
});
