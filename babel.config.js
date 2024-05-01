module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          "expo-router/babel",
          require.resolve("expo-router/babel"),
          "react-native-paper/babel",
        ],
      },
    },
  };
};
