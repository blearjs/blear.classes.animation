/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Animation = require('../src/index.js');

describe('测试文件', function () {
    var styleEl = document.createElement('style');
    var cssText = '@-webkit-keyframes test1 {' +
        '0% {width:100px}100%{width:200px;}' +
        '}' +
        '@keyframes test1 {' +
        '0% {width:100px}100%{width:200px;}' +
        '}' +
        '@-webkit-keyframes test2 {' +
        '0% {width:200px}100%{width:100px;}' +
        '}' +
        '@keyframes test2 {' +
        '0% {width:200px}100%{width:100px;}' +
        '}';

    if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = cssText;
    } else {
        styleEl.innerHTML = cssText;
    }

    document.body.appendChild(styleEl);

    afterAll(function () {
        document.body.removeChild(styleEl);
    });

    it('#transit', function (done) {
        var divEl = document.createElement('div');
        divEl.style.position = 'absolute';
        divEl.style.width = '100px';
        divEl.style.height = '100px';
        divEl.style.background = '#fcf';
        document.body.appendChild(divEl);

        var an = new Animation(divEl);

        an
            .transit({
                width: 200
            })
            .start(function () {

            });

        setTimeout(function () {
            document.body.removeChild(divEl);
            done();
        }, 1000);
    });


    it('#frame', function (done) {
        var divEl = document.createElement('div');
        divEl.style.position = 'absolute';
        divEl.style.width = '100px';
        divEl.style.height = '100px';
        divEl.style.background = '#fcf';
        document.body.appendChild(divEl);

        var an = new Animation(divEl);

        an = an.frame('test1');

        an.start(function () {

        });

        an.start(function () {

        });

        setTimeout(function () {
            document.body.removeChild(divEl);
            done();
        }, 1000);
    });

    it('#start', function (done) {
        var an = new Animation();

        an.start();
        expect(an.size()).toEqual(0);
        done();
    });
});
