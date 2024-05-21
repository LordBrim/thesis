import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";
import { RadioButtonProps } from "react-native-paper";

type IChecklistItem = {
  number: number;
  question: string;
};

export default function ChecklistItem({ number, question }: IChecklistItem) {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        value: true,
      },
      {
        id: "2",
        value: false,
      },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {number}.) {question}
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        layout="row"
        containerStyle={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  question: {
    flex: 1,
  },
});
