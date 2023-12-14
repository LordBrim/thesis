import { View, Text, ScrollView } from "reacti-native";

import { icons } from "../constants";

import styles from "./questionpanel.style";

const QuestionPanel = ({ question, answer }) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionBody}>
        <Text style={styles.questionTitle}>{question}</Text>
        <Image
          source={icons.arrowUpDown}
          resizeMode="cover"
          style={styles.iconToggle(dimension)}
        />
      </View>
      <View style={styles.answerBody}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </View>
  );
};

export default QuestionPanel;
