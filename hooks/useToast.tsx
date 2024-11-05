import { showToastable } from "react-native-toastable";

export const showLongToast = (message) => {
  showToastable({
    message: message,
    duration: 300000,
    backgroundColor: "#262626",
    messageColor: "white",
    position: "top",
    swipeDirection: ["left", "right"],
    alwaysVisible: true,
  });
};

export const showShortToast = (message) => {
  showToastable({
    message: message,
    duration: 3000,
    backgroundColor: "#262626",
    messageColor: "white",
    position: "top",
    swipeDirection: ["left", "right"],
    alwaysVisible: true,
  });
};
