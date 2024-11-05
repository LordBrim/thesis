const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolution for .cjs files
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'mjs'];

// Ensure proper asset handling
config.resolver.assetExts = [...config.resolver.assetExts, 'pem'];

// Add resolution for packages that might cause issues
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@react-native-community/cli-server-api': require.resolve('@react-native-community/cli-server-api'),
};

// Handle symlinks properly
config.resolver.enableSymlinks = true;

module.exports = config;