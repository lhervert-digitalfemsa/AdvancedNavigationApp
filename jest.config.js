module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@ui-kitten|@react-native|@react-navigation|@react-navigation/bottom-tabs)',
  ],
};