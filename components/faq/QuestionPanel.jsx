import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import styles from "./questionpanel.style";
import { icons } from "../../constants";

const QuestionPanel = ({ question, answer, isActive, onShow, onHide }) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionBody}>
        <TouchableWithoutFeedback onPress={isActive ? onHide : onShow}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{question}</Text>
            <Image
              source={isActive ? icons.arrowDownBold : icons.arrowUpBold}
              resizeMode="cover"
              style={styles.iconToggle}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isActive ? (
        <View style={styles.answerBody}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default QuestionPanel;