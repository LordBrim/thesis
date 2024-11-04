import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserCity = async (): Promise<string | null> => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      return user.city || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to get user city:", error);
    return null;
  }
};
