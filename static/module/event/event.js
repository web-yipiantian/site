/**
 * @desc 事件中心组件
 * @author Lone(qinmudi@baidu.com)
 * @version 1.0
 * @date 2015/9/14
 */

var $ = require('jquery');

function _create(target) {
    var ec = $(target);
    $.extend(target, {
        on: function(name, fn) {
            ec.on(_getEvtName(name), fn);
            return target;
        },
        once: function(name, fn) {
            ec.one(_getEvtName(name), fn);
            return target;
        },
        fire: function(name, fn) {
            var arr = Array.prototype.slice.call(arguments, 1);
            arr.unshift(_getEvtName(name));
            ec.trigger.apply(ec, arr);
            return target;
        },
        off: function(name, fn) {
            ec.unbind(_getEvtName(name), fn);
            return target;
        }
    });

    target.trigger = target.fire;
    return target;
}

function _getEvtName(name) {
    return 'on' + name.replace(/^on/i, '').toLowerCase();
}

module.exports = _create({});
module.exports.create = _create;

if (window.F) {
    F.ec = module.exports;
    F.evt = F.ec.create($('body'));
}