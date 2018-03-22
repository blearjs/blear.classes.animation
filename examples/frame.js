/**
 * 文件描述
 * @author ydr.me
 * @create 2018-03-22 11:15
 * @update 2018-03-22 11:15
 */


'use strict';

var Animation = require('../src/index');
var keyframe = require('blear.core.keyframe');

var ani = new Animation('#demo2');
var abc = keyframe.create({
    0: {
        transform: {
            translateX: '100%'
        }
    },
    1: {
        transform: {
            translateX: '-100%'
        }
    }
});

ani.frame(abc, {
    duration: 1000,
    count: -1
});

document.getElementById('start').onclick = function () {
    ani.start();
};
