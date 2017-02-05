/**
 * Copyright (c) 2016 Tencent, All rights reseved.
 * @fileoverview  ajax底层
 * @author  erikqin |  erikqin@tencent.com
 * @version 1.0  | 2016-06-20 |  erikqin    // 初始版本。
 *
 * @description    // 附加说明。
 *   1) 通用 ajax 方法为以后扩展提供支持。
 *
 * @example    // 典型的调用示例。
    var Ajax = require('static/module/ajax/ajax');
    Ajax.get('http://dc.wii.qq.com',{name:'erikqin'},function(){
        //成功以后要做的事
    });
 */

var $ = require('jquery');

var headers = { 'x-survey-request': 'ajax' };

/**
 * ajax的GET请求
 * @param  {String}   url      请求地址
 * @param  {Object}   data     请求参数
 * @param  {Function} callback 回调函数
 */
function get(url, data, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: data,
        headers: headers,
        success: function(res) {
            if (res.ret == 0) {
                $.isFunction(callback) ? callback.call(this, res) : '';
            } else {
                //modal.notification({message:'['+res.errorcode+']'+res.msg,title:'系统提示'});
                //Modal.notification({message:res.msg,title:'系统提示'});
            }
        },
        error: function() {
            errorHandler(arguments);
        }
    });
}

/**
 * ajax的POST请求
 * @param  {String}   url      请求地址
 * @param  {Object}   data     请求参数
 * @param  {Function} callback 回调函数
 */
function post(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        headers: headers,
        success: function(res) {
            if (res.ret == 0) {
                $.isFunction(callback) ? callback.call(this, res) : '';
            } else {
                //Modal.notification('系统提示', ('['+res.errorcode+']'+res.msg), 'error');
                //Modal.notification('系统提示', (res.msg), 'error');
            }
        },
        error: function() {
            errorHandler(arguments);
        }
    });
}

/**
 * 自定义的Ajax请求
 * @param  {String}   url      请求地址
 * @param  {Object}   type     请求参数
 * @param  {[type]}   data     回调函数
 */
function flex(url, type, data, callback) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        data: data,
        headers: headers,
        success: function(res) {
            $.isFunction(callback) ? callback.call(this, res) : '';
        },
        error: function() {
            errorHandler(arguments);
        }
    });
}

function errorHandler(res) {
    Modal.notification('系统提示','发生未知错误!','error');
}

module.exports = {
    get: get,
    post: post,
    flex: flex
}