import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { COLORS } from "../../../../constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants/measurements";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import TextInputWrapper from "../../../../components/common/TextInputWrapper";
import IconBtn from "../../../../components/common/IconButton";

export default function ManageIncentivesUpdate() {
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const incentives = hospitals.find(
    (section) => section.name === user.hospitalName
  ).incentives;
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Incentives",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
  const [updatedInfo, setUpdatedInfo] = useState(incentives.info);
  const [updatedNumber, setUpdatedNumber] = useState(
    incentives.number > 10 ? "10" : incentives.number.toString()
  );
  const [updatedData, setUpdatedData] = useState(incentives.data);
  interface IncentiveData {
    position: number;
    incentive: string;
  }
  const getIncentivesDataArray = (): IncentiveData[] => {
    return inputs
      .map((input) => ({
        position: input.position ? Number(input.position) : 0,
        incentive: input.info || "",
      }))
      .filter((data) => data.incentive || data.position);
  };
  const handleUpdate = () => {
    const incentivesData: IncentiveData[] = getIncentivesDataArray();
    console.log(incentivesData); // Now you have the data in the desired format
  };
  const generateId = () => Math.random().toString(36).substring(2, 9);
  const [inputs, setInputs] = useState([
    { id: generateId(), position: "", info: "" },
  ]);
  const handleAddInput = () => {
    setInputs([...inputs, { id: generateId(), position: "", info: "" }]);
  };
  const handleRemoveInput = (id) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((input) => input.id !== id));
    }
  };
  const handleInputChange = (id, field, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleUpdate}
        >
          <Text style={{ fontWeight: "bold" }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, updatedInfo, updatedNumber, updatedData, handleUpdate]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        overScrollMode="never"
        persistentScrollbar={true}
      >
        <TextInputWrapper label="Additional Information">
          <TextInput
            value={updatedInfo}
            onChangeText={(text) => setUpdatedInfo(text)}
            placeholder="Enter additional informatino..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Number Of Donations">
          <TextInput
            value={updatedNumber}
            onChangeText={(number) => setUpdatedNumber(number)}
            placeholder="Enter the number of donations..."
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <Text
          style={{
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Incentives
        </Text>

        {inputs.map((input) => (
          <View
            key={input.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TextInputWrapper label="Position" customStyle={{ width: "20%" }}>
              <TextInput
                value={input.position}
                onChangeText={(number) =>
                  handleInputChange(input.id, "position", number)
                }
                placeholder="0"
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                keyboardType="number-pad"
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </TextInputWrapper>
            <TextInputWrapper label="Incentive" customStyle={{ width: "50%" }}>
              <TextInput
                value={input.info}
                onChangeText={(text) =>
                  handleInputChange(input.id, "info", text)
                }
                placeholder="Enter an incentive..."
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                keyboardType="number-pad"
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </TextInputWrapper>

            <IconBtn
              icon="plus"
              size={18}
              onPress={handleAddInput}
              color="green"
            />
            <IconBtn
              icon="minus"
              size={18}
              onPress={() => handleRemoveInput(input.id)}
              color="red"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollview: {
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
