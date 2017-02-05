(function() {
    var F = {};
    var _data = {};
    F.context = function(key, value) {
        var length = arguments.length;
        if (length > 1) {
            _data[key] = value;
        } else if (length == 1) {
            if (typeof key == 'object') {
                for (var k in key) {
                    if (key.hasOwnProperty(k)) {
                        _data[k] = key[k];
                    }
                }
            } else {
                return _data[key];
            }
        }
    };
    'F' in window || (window.F = F);
})();

// require('static/module/event/event');
