import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SIZES, COLORS } from "../../../../constants";
import useFirestoreListener from "hooks/useFirestoreListener";
import UpdateCard from "../(updates)/update-card";

interface Update {
  id: string;
  timestamp: number;
  date: string;
  time: string;
  type: string;
  [key: string]: any;
}

export default function UpdatesTab() {
  const updates = useFirestoreListener();
  const [refreshing, setRefreshing] = useState(false);

  const [combinedData, setCombinedData] = useState<Update[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const prevUpdatesRef = useRef<Update[]>([]);

  useEffect(() => {
    const newUpdates = updates.filter(
      (update: Update) =>
        !prevUpdatesRef.current.some(
          (prevUpdate) =>
            prevUpdate.id === update.id &&
            prevUpdate.timestamp === update.timestamp
        )
    );

    const newCombinedData = new Map<string, Update>(
      combinedData.map((item) => [item.id + item.timestamp, item])
    );

    // Process new updates
    newUpdates.forEach((update) => {
      if (isValidUpdate(update)) {
        newCombinedData.set(update.id + update.timestamp, formatUpdate(update));
      }
    });

    // Convert the map back to an array and sort by timestamp
    const sortedData = Array.from(newCombinedData.values()).sort(
      (a, b) => (b as Update).timestamp - (a as Update).timestamp
    );

    setCombinedData(sortedData as Update[]);

    prevUpdatesRef.current = updates;
  }, [updates]);

  const filteredData = combinedData.filter((item) => {
    if (filter === "All") return true;
    return item.type.toLowerCase() === filter.toLowerCase();
  });

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const isValidUpdate = (update: Update): boolean => {
    return (
      update &&
      update.date &&
      update.time &&
      update.date !== "1728384411604" &&
      update.time !== "Unknown time" &&
      isValidDate(update.date)
    );
  };

  const formatUpdate = (update: Update): Update => {
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} overScrollMode="never">
        {filteredData.length === 0 ? (
          <Text style={styles.noDataText}>There are no notifications yet</Text>
        ) : (
          filteredData.map((item, index) => (
            <UpdateCard key={item.id + item.timestamp || index} update={item} />
          ))
        )}
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
  noDataText: {
    marginTop: 20,
    textAlign: "center",
    color: COLORS.text,
  },
});
