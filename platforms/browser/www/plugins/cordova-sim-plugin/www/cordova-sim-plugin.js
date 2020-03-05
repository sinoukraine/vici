cordova.define("cordova-sim-plugin.SimPlugin", function(require, exports, module) { var exec = require('cordova/exec');

SimPlugin = {
    getSimInfo: function(success, error) {
        exec(success, error, 'SimPlugin', 'getSimInfo', []);
    }
};

module.exports = SimPlugin;

});
