import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { SIZES, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import {
  usePushNotification,
  CustomNotification,
} from "hooks/usePushNotifcation";
import TestNotif from "../../../components/test-notif";
import useFirestoreListener from "hooks/useFirestoreListener";
import UpdateCard from "./updateCard";

export default function UpdatesGeneral() {
  const { notification, expoPushToken } = usePushNotification(); // Extract expoPushToken
  const updates = useFirestoreListener();

  const [combinedData, setCombinedData] = useState([]);
  const [filter, setFilter] = useState("All");

  const prevUpdatesRef = useRef([]);
  const prevNotificationsRef = useRef<CustomNotification[]>([]);

  useEffect(() => {
    const newUpdates = updates.filter(
      (update) =>
        !prevUpdatesRef.current.some(
          (prevUpdate) =>
            prevUpdate.id === update.id &&
            prevUpdate.timestamp === update.timestamp
        )
    );
    const newNotifications = notification.filter(
      (notif) =>
        !prevNotificationsRef.current.some(
          (prevNotif) => prevNotif.id === notif.id
        )
    );

    const newCombinedData = new Map(
      combinedData.map((item) => [item.id + item.timestamp, item])
    );

    // Process new updates
    newUpdates.forEach((update) => {
      if (isValidUpdate(update)) {
        newCombinedData.set(update.id + update.timestamp, formatUpdate(update));
      }
    });

    // Process new notifications
    newNotifications.forEach((notif) => {
      if (isValidNotification(notif)) {
        newCombinedData.set(
          notif.id + notif.timestamp,
          formatNotification(notif)
        );
      }
    });

    // Convert the map back to an array and sort by timestamp
    const sortedData = Array.from(newCombinedData.values()).sort(
      (a, b) => b.timestamp - a.timestamp
    );

    setCombinedData(sortedData);

    prevUpdatesRef.current = updates;
    prevNotificationsRef.current = notification;
  }, [updates, notification]);

  const filteredData = combinedData.filter((item) => {
    if (filter === "All") return true;
    return item.type.toLowerCase() === filter.toLowerCase();
  });

  const sendPushNotification = async () => {
    console.log("Expo Push Token in sendPushNotification:", expoPushToken);
    if (!expoPushToken) {
      Alert.alert("Error", "Push token is not available");
      return;
    }

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Test Notification dasdas",
      body: "This is a test notification",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {Filters.map((filterItem) => (
          <Pressable
            key={filterItem.id}
            onPress={() => setFilter(filterItem.type)}
          >
            <Text
              style={[
                styles.filter,
                filter === filterItem.type && styles.activeFilter,
              ]}
            >
              {filterItem.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView style={styles.scrollView} overScrollMode="never">
        {filteredData.map((item, index) => (
          <UpdateCard key={item.id + item.timestamp || index} update={item} />
        ))}
      </ScrollView>
      <Button title="Send Notification" onPress={sendPushNotification} />
    </View>
  );
}

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const isValidUpdate = (update) => {
  return (
    update &&
    update.date &&
    update.time &&
    update.date !== "1728384411604" &&
    update.time !== "Unknown time" &&
    isValidDate(update.date)
  );
};

const isValidNotification = (notif) => {
  return notif && notif.date && notif.time && isValidDate(notif.date);
};

const formatUpdate = (update) => {
  const date = new Date(update.date);
  return {
    ...update,
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const formatNotification = (notif) => {
  const date = new Date(notif.date);
  return {
    ...notif,
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  filters: {
    flexDirection: "row",
    gap: 4,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    justifyContent: "space-between",
    elevation: 3,
    backgroundColor: "white",
  },
  filter: {
    fontSize: SIZES.xSmall,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: COLORS.slate500,
  },
  activeFilter: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});

const Filters = [
  { id: 0, title: "All", type: "All" },
  { id: 1, title: "Donations", type: "donation" },
  { id: 2, title: "Appointments", type: "appointment" },
  { id: 3, title: "Requests", type: "request" },
  { id: 4, title: "Incentives", type: "incentives" },
];
