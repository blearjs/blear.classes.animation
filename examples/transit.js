/**
 * 文件描述
 * @author ydr.me
 * @create 2018-03-22 11:15
 * @update 2018-03-22 11:15
 */


'use strict';

var Animation = require('../src/index');

var ani = new Animation('#demo');

ani.transit({
    width: 200
}, {
    duration: 1000
});

ani.transit({
    height: 200
}, {
    duration: 1000
});

ani.transit({
    width: 100
}, {
    duration: 1000
});

ani.transit({
    height: 100
}, {
    duration: 1000
});

document.getElementById('start').onclick = function () {
    ani.start();
};
