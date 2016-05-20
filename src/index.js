/**
 * classes animation
 * @author ydr.me
 * @create 2016-04-20 10:41
 */



'use strict';

var Events =    require('blear.classes.events');
var object =    require('blear.utils.object');
var howdo =     require('blear.utils.howdo');
var array =     require('blear.utils.array');
var fun =       require('blear.utils.function');
var typeis =    require('blear.utils.typeis');
var date =      require('blear.utils.date');
var transform = require('blear.core.transform');
var selector =  require('blear.core.selector');


var defaults = transform.defaults;


var Animation = Events.extend({
    className: 'Animation',
    constructor: function Animation(el, options) {
        var the = this;

        Animation.parent(the);
        the[_el] = selector.query(el)[0];
        the[_options] = object.assign(true, {}, defaults, options);
        the[_queue] = [];
        the[_started] = false;
        the[_transform] = {};
        the[_length] = 0;
    },


    /**
     * 过渡动画
     * @param to {Object} 过渡动画终点
     * @param [options] {Object} 过渡动画配置
     * @param options.duration {Number} 过渡时间
     * @param options.easing {String} 过渡缓冲
     * @returns {Animation}
     */
    transit: function (to, options) {
        var the = this;
        var index = the[_length];

        options = object.assign(true, {}, the[_options], options);
        the[_queue].push(function (next) {
            if (typeis.Object(to.transform)) {
                the[_transform] = to.transform = object.assign(true, {}, the[_transform], to.transform);
            } else {
                the[_transform] = to.transform;
            }

            var startTime = date.now();
            var meta = {
                type: 'transition',
                index: index,
                to: to,
                options: options,
                startTime: startTime
            };
            the.emit('stepIn', meta);
            transform.transit(the[_el], to, options, function () {
                var stopTime = date.now();

                meta.stopTime = stopTime;
                meta.elapsedTime = stopTime - startTime;
                the.emit('stepOut', meta);
                next();
            });
        });
        the[_length]++;

        return the;
    },


    /**
     * 帧动画
     * @param name {String} 帧动画名称
     * @param options {Object} 帧动画配置
     * @param options.count {Number} 动画次数
     * @param options.duration {Number} 过渡时间
     * @param options.easing {String} 过渡缓冲
     * @returns {Animation}
     */
    frame: function (name, options) {
        var the = this;
        var index = the[_length];

        options = object.assign(true, {}, the[_options], options);
        the[_queue].push(function (next) {
            var startTime = date.now();
            var meta = {
                type: 'keyframes',
                frameName: name,
                index: index,
                options: options,
                startTime: startTime
            };
            the.emit('stepIn', meta);
            transform.frame(the[_el], name, options, function () {
                var stopTime = date.now();

                meta.stopTime = stopTime;
                meta.elapsedTime = stopTime - startTime;
                the.emit('stepOut', meta);
                next();
            });
        });
        the[_length]++;

        return the;
    },


    /**
     * 开始动画
     * @param callback {Function}
     *
     * @example
     * animation.start(callback);
     */
    start: function (callback) {
        var the = this;

        if (the[_started]) {
            return;
        }

        if (!the[_queue].length) {
            return;
        }

        the[_started] = true;

        var queue = howdo;

        array.each(the[_queue], function (index, task) {
            queue = queue.task(task);
        });

        // 异步串行
        var startTime = date.now();
        the.emit('start', {
            timeStamp: startTime
        });
        queue.follow(function () {
            the[_started] = false;
            var endTime = date.now();
            the.emit('stop', {
                timeStamp: endTime,
                elaspedTime: endTime - startTime
            });

            if (typeis.Function(callback)) {
                callback();
            }
        });
    },


    /**
     * 返回长度
     * @returns {number}
     */
    size: function () {
        return this[_length];
    },


    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        fun.until(function () {
            Animation.parent.destroy(the);
            the[_queue] = [];
            the[_started] = false;
            the[_transform] = {};
            the[_length] = 0;
        }, function () {
            return the[_started] === false;
        });
    }
});

var _el = Animation.sole();
var _queue = Animation.sole();
var _length = Animation.sole();
var _transform = Animation.sole();
var _started = Animation.sole();
var _options = Animation.sole();

Animation.defaults = defaults;
module.exports = Animation;
