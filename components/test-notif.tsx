import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { usePushNotification } from "hooks/usePushNotifcation";

const sendNotification = async (expoPushToken: string | undefined) => {
  if (!expoPushToken) {
    console.error("No Expo push token available");
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "notifSound.wav",
    title: "Test Notification afdsaf",
    body: "This is a test notification sent from your app!",
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

const NotificationButton: React.FC = () => {
  const { expoPushToken } = usePushNotification();

  const handlePress = async () => {
    await sendNotification(expoPushToken);
    console.log(`expoPushToken`, expoPushToken);
  };

  return (
    <View style={styles.container}>
      <Button title="Send Test Notification" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationButton;
