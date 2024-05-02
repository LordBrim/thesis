import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  HORIZONTAL_SCREEN_MARGIN,
} from "../../constants";
import QuestionCard from "./QuestionCard";
import { useState } from "react";

type IQuestionPanel = {
  title: string;
};

export default function QuestionPanel({ title }: IQuestionPanel) {
  const [isActiveIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.questions}>
        <QuestionCard
          question="What is blood?"
          answer="Blood is blood"
          isActive={isActiveIndex}
          onShow={() => setActiveIndex(1)}
          onHide={() => setActiveIndex(0)}
        />
        <QuestionCard
          question="What is blood?"
          answer="Blood is blood"
          isActive={isActiveIndex}
          onShow={() => setActiveIndex(2)}
          onHide={() => setActiveIndex(0)}
        />
      </View>
      {/* <Text style={styles.titleHeader}>Help Desk</Text> */}

      {/* <FlatList
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
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.gray2,
    borderBottomWidth: 1,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 8,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  questions: {},
});
