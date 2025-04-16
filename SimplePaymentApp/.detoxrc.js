module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/jest.config.js',
  apps: {
    android: {
      type: 'android.attached',
      binaryPath: 'path/to/your/app.apk',
      build: 'expo run:android',
      device: {
        adbName: 'emulator-5554', // Change this to your emulator/device ID
      },
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_AOSP', // Change this to your AVD name
      },
    },
  },
  configurations: {
    android: {
      device: 'emulator',
      app: 'android',
    },
  },
};
