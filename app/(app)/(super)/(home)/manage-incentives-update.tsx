import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import TextInputWrapper from "components/common/TextInputWrapper";
import IconBtn from "components/common/IconButton";
import {
  updateHospitalIncentivesByUuid,
  updateIncentives,
} from "rtx/slices/hospitals";

interface IncentiveData {
  position: number;
  incentive: string;
}

export default function ManageIncentivesUpdate() {
  const { uuid } = useLocalSearchParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find((section) => section.uuid === uuid);
  const incentives = hospitals.find(
    (section) => section.name === user.hospitalName
  )?.incentives || { info: "", number: 0, data: [] };
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Incentives",
      headerTintColor: "#000000",
      headerTitleStyle: { fontSize: 16 },
      headerTitleAlign: "center",
    });
  }, []);
  const [updatedInfo, setUpdatedInfo] = useState(incentives.info);
  const [updatedNumber, setUpdatedNumber] = useState(
    incentives.number === null ? "4" : "10"
  );
  const [inputs, setInputs] = useState(incentives.data);
  const getIncentivesDataArray = (): IncentiveData[] => {
    return inputs
      .map((input) => ({
        position: input.position ? Number(input.position) : 0,
        incentive: input.incentive || "",
      }))
      .filter((data) => data.incentive || data.position);
  };
  const checkUniquePositions = (): boolean => {
    const positions = inputs.map((input) => input.position);
    return new Set(positions).size === positions.length;
  };
  const checkArraySize = (): boolean => {
    return inputs.length <= Number(updatedNumber);
  };
  const handleUpdate = (): void => {
    if (!checkUniquePositions()) {
      Alert.alert("Error", "Positions must be unique.");
      return;
    }
    if (!checkArraySize()) {
      Alert.alert(
        "Error",
        `Number of entries exceeds allowed limit of ${updatedNumber}.`
      );
      return;
    }
    const sortedInputs = [...inputs].sort((a, b) => a.position - b.position);
    setInputs(sortedInputs);
    dispatch(
      updateIncentives({
        uuid: hospital.uuid,
        updatedIncentives: {
          info: updatedInfo,
          number: parseInt(updatedNumber),
          data: getIncentivesDataArray(),
        },
      })
    );
    updateHospitalIncentivesByUuid(hospital.uuid.toString(), {
      info: updatedInfo,
      number: parseInt(updatedNumber),
      data: getIncentivesDataArray(),
    });
    router.back();
  };
  const handleAddInput = (): void => {
    if (inputs.length < parseInt(updatedNumber)) {
      setInputs([...inputs, { position: "", incentive: "" }]);
    }
  };
  const handleRemoveInput = (index: number): void => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };
  const handleInputChange = (
    index: number,
    field: keyof IncentiveData,
    value: string
  ): void => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, [field]: value } : input
      )
    );
  };
  const handleNumber = (number) => {
    if (number > 10) {
      setUpdatedNumber("10");
    } else if (number > 2) {
      setUpdatedNumber("1");
    } else {
      setUpdatedNumber(number);
    }
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
  }, [navigation, updatedInfo, updatedNumber, inputs, handleUpdate]);
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
            placeholder="Enter additional information..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{ flex: 1, padding: 12 }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Number Of Donations">
          <TextInput
            value={updatedNumber}
            onChangeText={(number) => handleNumber(number)}
            placeholder="Enter the number of donations..."
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{ flex: 1, padding: 12 }}
          />
        </TextInputWrapper>
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          Incentives
        </Text>
        {inputs.map((input, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TextInputWrapper label="Position" customStyle={{ width: "20%" }}>
              <TextInput
                value={input.position.toString()}
                onChangeText={(number) =>
                  handleInputChange(index, "position", number)
                }
                placeholder="0"
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                keyboardType="number-pad"
                style={{ flex: 1, padding: 12 }}
              />
            </TextInputWrapper>
            <TextInputWrapper label="Incentive" customStyle={{ width: "50%" }}>
              <TextInput
                value={input.incentive}
                onChangeText={(text) =>
                  handleInputChange(index, "incentive", text)
                }
                placeholder="Enter an incentive..."
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                style={{ flex: 1, padding: 12 }}
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
              onPress={() => handleRemoveInput(index)}
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
