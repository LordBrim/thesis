import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  COLORS,
  SIZES,
  HORIZONTAL_SCREEN_MARGIN,
  FAQuestions,
  GS,
} from "../../constants";
import QuestionCard from "./QuestionCard";
import { useState } from "react";

type IQuestionPanel = {
  title: string;
};

export default function QuestionPanel({ title }: IQuestionPanel) {
  const [filteredData, setFilteredData] = useState(FAQuestions);

  return (
    <View style={styles.container}>
      <Text style={[GS.h3, styles.title]}>{title}</Text>
      <FlatList
        contentContainerStyle={(styles.container, { gap: 16 })}
        data={filteredData}
        renderItem={({ item }) => (
          <QuestionCard question={item.question} answer={item.answer} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.slate100,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 8,
  },
});
