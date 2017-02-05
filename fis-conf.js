fis.require('smarty')(fis);
fis.set('namespace', 'onesky');

var RECEIVER = 'http://127.0.0.1:8999/receiver';
var PATH = '/Users/qinmudi/ericqin/tencentSvn/dc.wii.qq.com_v1.1'; 

// 设置组件库里面的 js 都是模块化 js.
fis.match('/components/**.{js,css}', {
    isMod: true
});

//启动sass支持
fis.match('*.scss', {
    parser: fis.plugin('node-sass', {
        include_paths: ['static/base'] // 加入文件查找目录
    }),
    rExt: '.css',
    isMod: true,
    useHash: true
});

fis.match('*.es', {
    parser: fis.plugin('babel'),
    useHash: true,
    rExt: '.js' // 代码编译产出时，后缀改成 .js
});

fis.match('*.{css,scss,js,es}', {
    optimizer: null
});


fis.match('*.{js,es,es6,jsx,ts,tsx}', {
    preprocessor: fis.plugin('js-require-css')
});