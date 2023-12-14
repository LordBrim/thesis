import { View, Text } from "react-native";

import styles from "./questionpanel.style";

const QuestionPanel = ({ question, answer, isActive }) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <View style={styles.questionBody}>
        <Text style={styles.questionTitle}>{question}</Text>
        {/* <Image
          source={icons.arrowUpDown}
          resizeMode="cover"
          style={styles.iconToggle(dimension)}
        /> */}
      </View>
      {isActive ? (
        <View style={styles.answerBody}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ) : (
        <Text>Hidden</Text>
      )}
    </View>
  );
};

export default QuestionPanel;
