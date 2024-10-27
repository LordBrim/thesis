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
import { SIZES, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import {
  usePushNotification,
  CustomNotification,
} from "hooks/usePushNotification";
import useFirestoreListener from "hooks/useFirestoreListener";
import UpdateCard from "../(updates)/update-card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdatesTab() {
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} overScrollMode="never">
        {filteredData.map((item, index) => (
          <UpdateCard key={item.id + item.timestamp || index} update={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});
