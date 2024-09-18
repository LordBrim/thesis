import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
type IAvatar = {
  avatarUrl: ImageSourcePropType;
  onEdit: () => void;
};

export default function Avatar({ avatarUrl, onEdit }: IAvatar) {
  return (
    <View>
      <Pressable onPress={onEdit} style={styles.container}>
        <Image style={styles.image} source={avatarUrl} resizeMode="cover" />
      </Pressable>
      <MaterialIcons
        name="edit"
        size={24}
        color="white"
        style={styles.editIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    position: "absolute", // Position the icon absolutely inside the container
    top: 5, // Adjust as needed to position the icon in the top-right corner
    right: -3, // Adjust as needed to position the icon in the top-right corner
    backgroundColor: "#f83e3e", // Optional: Add a background if needed for visibility
    borderRadius: 15, // Optional: Rounded corners for the icon background
    padding: 1, // Optional: Padding around the icon for better appearance
    opacity: 0.9, // Optional: Adjust the opacity for better appearance
  },
});
