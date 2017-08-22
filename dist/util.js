'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by henryleu on 14/07/2017.
 */

var isTel = function isTel(v) {
    return (/^1[3|4|5|7|8]\d{9}$/.test(v)
    );
};

/**
 * Clone a new class constructor by invoking
 * source class constructor's method of it
 * TODO examples
 * @param name new Class's name
 * @returns {target}
 */
var clone = function clone(name) {
    var source = this;
    var target = function target() {
        return source.apply(this, arguments);
    };

    // rename constructor
    if (name) {
        Object.defineProperty(target, 'name', { value: name, writable: false });
    }

    // copy source function's properties
    for (var key in source) {
        if (source.hasOwnProperty(key)) target[key] = source[key];
    }

    // copy source function's prototype properties
    if (source.prototype && _typeof(source.prototype) === 'object') {
        var srcProto = source.prototype;
        for (var _key in srcProto) {
            if (srcProto.hasOwnProperty(_key)) target.prototype[_key] = srcProto[_key];
        }
    }

    return target;
};

module.exports = {
    isTel: isTel,
    clone: clone,
    assign: require('./object-assign')
};
//# sourceMappingURL=util.js.map