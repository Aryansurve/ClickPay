// babel.config.js
module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset', {
      unstable_transformProfile: 'hermes-stable',
    }],
  ],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};