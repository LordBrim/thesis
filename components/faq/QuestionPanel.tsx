import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";

export default function QuestionPanel({}) {
  return (
    <View>
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
    padding: SIZES.medium,
    borderWidth: 1,
    marginBottom: SIZES.large,
    borderRadius: 15,
    borderColor: COLORS.gray2,
  },
  questionBody: {
    flexDirection: "row",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionTitle: {
    // fontFamily: FONT.Grotesk,
    fontWeight: "bold",
    color: COLORS.redWhite,
  },
  iconToggle: {
    marginLeft: SIZES.small,
    width: 20,
    height: 20,
  },
  answerBody: {
    marginTop: SIZES.small,
    padding: SIZES.small,
    borderRadius: 15,
    backgroundColor: COLORS.redWhite,
  },
  answerText: {
    color: COLORS.white,
  },
});
