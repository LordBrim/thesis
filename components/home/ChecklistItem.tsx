import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";
import { RadioButtonProps } from "react-native-paper";

type IChecklistItem = {
  question: string;
};

export default function ChecklistItem() {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Option 1",
        value: "option1",
      },
      {
        id: "2",
        label: "Option 2",
        value: "option2",
      },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <View style={styles.container}>
      <Text>Checklist Item</Text>
      {/* <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
