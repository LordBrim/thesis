import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IAvatar = {
  avatarUrl: string | null;
  onEdit?: () => void; // Make onEdit optional
};

export default function Avatar({ avatarUrl, onEdit }: IAvatar) {
  return (
    <View>
      <Pressable onPress={onEdit ? onEdit : undefined} style={styles.container}>
        <Image
          style={styles.image}
          source={
            typeof avatarUrl === "string"
              ? { uri: avatarUrl } // If it's a string, treat it as a URI
              : avatarUrl // If it's an object (local image), use it directly
          }
          resizeMode="cover"
        />
      </Pressable>
      {onEdit && (
        <MaterialIcons
          name="edit"
          size={24}
          color="white"
          style={styles.editIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 125,
    height: 125,
    borderRadius: 75,
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
    position: "absolute",
    top: 5,
    right: -3,
    backgroundColor: "#f83e3e",
    borderRadius: 15,
    padding: 1,
    opacity: 0.9,
  },
});
