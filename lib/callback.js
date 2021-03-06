exports.create = function() {
  var lastId = 1,
      callbacks = {};

  return Object.create({}, {
    wrap: {
      value: function(callback) {
        var callbackId = lastId++;
        callbacks[callbackId] = callback || function() {};
        return callbackId;
      }
    },
    processResponse: {
      value: function(callbackId, args) {
        var callback = callbacks[callbackId];
        callback.apply(null, args);
        delete callbacks[callbackId];
      }
    },
    removeResponseCallbackEntry: {
      value: function(callbackId) {
        delete callbacks[callbackId];
      }
    }
  });
};
