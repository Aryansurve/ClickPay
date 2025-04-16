module.exports = {
    resolver: {
      blacklistRE: RegExp(
        '(node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js|' +
        'node_modules/react-native/Libraries/EventEmitter/RCTDeviceEventEmitter.js)'
      ),
    },
  };