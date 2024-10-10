import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export interface PushNotificationState {
  notification?: CustomNotification[];
  expoPushToken?: string;
}

export interface CustomNotification extends Notifications.Notification {
  id: string;
  timestamp: number; // Add timestamp property
}

export const usePushNotification = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotifications] = useState<CustomNotification[]>([]);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    console.log("Initializing push notification setup");

    // Set up notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Register for push notifications
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("Expo Push Token generated:", token);
        setExpoPushToken(token);
      })
      .catch((error) =>
        console.error("Error registering for push notifications:", error)
      );

    // Add listeners
    addListeners();

    return () => {
      console.log("Cleaning up push notification listeners");
      removeListeners();
    };
  }, []); // Ensure useEffect runs only once

  const addListeners = () => {
    // Ensure listeners are only added once
    if (!notificationListener.current) {
      console.log("Adding notification listener");
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received:", notification);
          const customNotification: CustomNotification = {
            ...notification,
            id: notification.request.identifier,
            timestamp: new Date().getTime(), // Add timestamp
          };
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            customNotification,
          ]);
        });
    }

    if (!responseListener.current) {
      console.log("Adding response listener");
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification response received:", response);
        });
    }
  };

  const removeListeners = () => {
    if (notificationListener.current) {
      console.log(
        "Removing notification listener",
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      notificationListener.current = undefined; // Reset listener ref
    }
    if (responseListener.current) {
      console.log("Removing response listener", responseListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      responseListener.current = undefined; // Reset listener ref
    }
  };

  const registerForPushNotificationsAsync = async (): Promise<
    string | undefined
  > => {
    if (!Device.isDevice) {
      console.log("Must use physical device for Push Notifications");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      console.log("Requesting push notification permissions");
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error("Failed to get push token for push notification!");
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    console.log("Project ID:", projectId);
    if (!projectId) {
      throw new Error("Project ID not found");
    }

    console.log("Generating Expo push token");
    const tokenResponse = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    const token = tokenResponse.data;
    console.log("Expo push token generated:", token);
    setExpoPushToken(token);

    if (Platform.OS === "android") {
      console.log("Setting up Android notification channel");
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "notifSound.wav",
      });
    }

    return token;
  };

  return { notification, expoPushToken };
};
