import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
  View,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import TextInputWrapper from "components/common/TextInputWrapper";
import { useDispatch } from "react-redux";
import { createHospital } from "rtx/slices/hospitals";
import { router, useNavigation } from "expo-router";

export default function ManageFaqCreate() {
  const [newHospitalName, setNewHospitalName] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongtitude, setNewLongtitude] = useState("");
  const [isEnabledOplus, toggleOplus] = useState(false);
  const [isEnabledOminus, toggleOminus] = useState(false);
  const [isEnabledAplus, toggleAplus] = useState(false);
  const [isEnabledAminus, toggleAminus] = useState(false);
  const [isEnabledBplus, toggleBplus] = useState(false);
  const [isEnabledBminus, toggleBminus] = useState(false);
  const [isEnabledABplus, toggleABplus] = useState(false);
  const [isEnabledABminus, toggleABminus] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          onPress={handleCreate}
        >
          <Text style={{ fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    newHospitalName,
    newLogoUrl,
    newAddress,
    newContactNumber,
    newLatitude,
    newLongtitude,
    isEnabledOplus,
    isEnabledOminus,
    isEnabledAplus,
    isEnabledAminus,
    isEnabledBplus,
    isEnabledBminus,
    isEnabledABplus,
    isEnabledABminus,
  ]);

  const handleCreate = () => {
    dispatch(
      createHospital({
        name: newHospitalName,
        logoUrl: newLogoUrl,
        address: newAddress,
        contactNumber: newContactNumber,
        coordinates: {
          latitude: parseFloat(newLatitude),
          longtitude: parseFloat(newLongtitude),
        },
        stock: [
          { type: "O+", available: isEnabledOplus },
          { type: "O-", available: isEnabledOminus },
          { type: "A+", available: isEnabledAplus },
          { type: "A-", available: isEnabledAminus },
          { type: "B+", available: isEnabledBplus },
          { type: "B-", available: isEnabledBminus },
          { type: "AB+", available: isEnabledABplus },
          { type: "AB-", available: isEnabledABminus },
        ],
      })
    );
    // addFAQToFirebase(newTitle, newQuestion, newAnswer);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        overScrollMode="never"
        persistentScrollbar={true}
      >
        <TextInputWrapper label="Name">
          <TextInput
            value={newHospitalName}
            onChangeText={(text) => setNewHospitalName(text)}
            placeholder="Enter a hospital name..."
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
        <TextInputWrapper label="Logo Url">
          <TextInput
            value={newLogoUrl}
            onChangeText={(text) => setNewLogoUrl(text)}
            placeholder="Enter a logo url..."
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
        <TextInputWrapper label="Address">
          <TextInput
            value={newAddress}
            onChangeText={(text) => setNewAddress(text)}
            placeholder="Enter an address..."
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
        <TextInputWrapper label="Contact Number">
          <TextInput
            value={newContactNumber}
            onChangeText={(text) => setNewContactNumber(text)}
            placeholder="Enter a contact number..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Latitude">
          <TextInput
            value={newLatitude}
            onChangeText={(number) => setNewLatitude(number)}
            placeholder="Enter a latitude..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Longtitude">
          <TextInput
            value={newLongtitude}
            onChangeText={(number) => setNewLongtitude(number)}
            placeholder="Enter a longtitude..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <View style={styles.row}>
          {/* Type O */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>O+</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledOplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleOplus(!isEnabledOplus)}
                value={isEnabledOplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>O-</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledOminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleOminus(!isEnabledOminus)}
                value={isEnabledOminus}
              />
            </View>
          </View>
          {/* Type A */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>A+</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledAplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleAplus(!isEnabledAplus)}
                value={isEnabledAplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>A-</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledAminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleAminus(!isEnabledAminus)}
                value={isEnabledAminus}
              />
            </View>
          </View>
          {/* Type B */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>B+</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledBplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleBplus(!isEnabledBplus)}
                value={isEnabledBplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>B-</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledBminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleBminus(!isEnabledBminus)}
                value={isEnabledBminus}
              />
            </View>
          </View>
          {/* Type AB */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>AB+</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledABplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleABplus(!isEnabledABplus)}
                value={isEnabledABplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>A-</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledABminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleABminus(!isEnabledABminus)}
                value={isEnabledABminus}
              />
            </View>
          </View>
        </View>
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
  row: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  blood: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
  },
  detail: {
    fontWeight: "bold",
  },
});
