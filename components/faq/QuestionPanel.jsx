import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import styles from "./questionpanel.style";
import { icons } from "../../constants";

const QuestionPanel = ({ question, answer, isActive, onShow, onHide }) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <View style={styles.questionBody}>
        <Text style={styles.questionTitle}>{question}</Text>
        {isActive ? (
          <TouchableWithoutFeedback onPress={onHide}>
            <Image
              source={icons.arrowDownBold}
              resizeMode="cover"
              style={styles.iconToggle}
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={onShow}>
            <Image
              source={icons.arrowUpBold}
              resizeMode="cover"
              style={styles.iconToggle}
            />
          </TouchableWithoutFeedback>
        )}
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
