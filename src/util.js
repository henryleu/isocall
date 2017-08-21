/**
 * Created by henryleu on 14/07/2017.
 */

const isTel = (v) => /^1[3|4|5|7|8]\d{9}$/.test(v);

/**
 * Clone a new class constructor by invoking
 * source class constructor's method of it
 * TODO examples
 * @param name new Class's name
 * @returns {target}
 */
const clone = function (name) {
    const source = this;
    const target = function () { return source.apply(this, arguments); };

    // rename constructor
    if (name) {
        Object.defineProperty(target, 'name', {value: name, writable: false});
    }

    // copy source function's properties
    for (const key in source) {
        if (source.hasOwnProperty(key)) target[key] = source[key]
    }

    // copy source function's prototype properties
    if (source.prototype && typeof source.prototype === 'object') {
        const srcProto = source.prototype;
        for (const key in srcProto) {
            if (srcProto.hasOwnProperty(key)) target.prototype[key] = srcProto[key];
        }
    }

    return target;
};

module.exports = {
    isTel,
    clone,
    assign: require('./object-assign')
};
