import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import IconBtn from "components/common/IconButton";
import { router } from "expo-router";

export default function ManageUserRequests() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <Card name={item.name} status={item.status} />
        )}
        keyExtractor={(item) => item.name}
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
      />
    </View>
  );
}

export function Card({ name, status }: TicketState) {
  const handlePress = () => {
    router.push({
      pathname: "(app)/(admin)/(home)/manage-ticket-review",
      params: {
        name: name,
        status: status,
        // Everything else
      },
    });
  };

  return (
    <Pressable
      style={card.container}
      android_ripple={{ radius: 250 }}
      onPress={handlePress}
    >
      <View
        style={{
          flexShrink: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {status === "pending" && (
          <IconBtn icon="user-minus" size={18} color="gray" />
        )}
        {status === "rejected" && (
          <IconBtn icon="user-xmark" size={18} color="red" />
        )}
        {status === "accepted" && (
          <IconBtn icon="user-check" size={18} color="green" />
        )}
        <Text style={card.name}>{name}</Text>
      </View>
      <IconBtn icon="angle-right" size={18} onPress={handlePress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  },
  name: {
    minWidth: "78%",
    fontWeight: "bold",
  },
});

interface TicketState {
  name: string;
  status: "pending" | "rejected" | "accepted";
}

const tickets: TicketState[] = [
  {
    name: "Andrei",
    status: "pending",
  },
  {
    name: "Angelo",
    status: "rejected",
  },
  {
    name: "Nicole",
    status: "accepted",
  },
];
