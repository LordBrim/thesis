import ActionBtn from "components/home/ActionBtn";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Request() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ gap: 16 }}>
        <View style={styles.buttons}>
          <ActionBtn
            href="/(app)/(home)/request-bloodunit"
            title="File A Request"
            subtitle="Request for an available blood unit."
            cta
          />
        </View>

        <Text style={styles.title}>Guidelines For Requesting Blood</Text>

        <FlatList
          data={sampleGuidelines}
          renderItem={({ item }) => (
            <View style={{ gap: 4 }}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  flatlist: {
    rowGap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  header: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SPACES.sm,
  },
});

const sampleGuidelines = [
  {
    id: 1,
    title: "Guideline #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 2,
    title: "Guideline #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 3,
    title: "Guideline #3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 4,
    title: "Guideline #4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
];
