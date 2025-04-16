class EventEmitter {
    constructor() {
      this._listeners = {};
    }
  
    addListener(eventType, listener) {
      if (!this._listeners[eventType]) {
        this._listeners[eventType] = new Set();
      }
      this._listeners[eventType].add(listener);
      return {
        remove: () => {
          this.removeListener(eventType, listener);
        }
      };
    }
  
    removeListener(eventType, listener) {
      if (this._listeners[eventType]) {
        this._listeners[eventType].delete(listener);
      }
    }
  
    emit(eventType, ...args) {
      if (this._listeners[eventType]) {
        for (const listener of this._listeners[eventType]) {
          listener(...args);
        }
      }
    }
  }
  
  module.exports = EventEmitter;