import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { useState } from "react";

import styles from "./faq.style";
import { FAQuestions } from "../../../constants";

import QuestionPanel from "../../../components/faq/QuestionPanel";

const FAQ = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={FAQuestions}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default FAQ;
