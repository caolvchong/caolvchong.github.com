/**
 * @description 通用模块
 * @author <caolvchong@gmail.com>
 * @date 2014-1-2
 */
define(function (require, exports, module) {
    var $ = require('$');
    var Ajax = require('../lib/util/ajax');

    // 设定AJAX成功的判断条件
    Ajax.setSuccessRule(function(data) {
        return data.code === 200;
    });
    // 设定AJAX无权限的判断条件
    Ajax.setPermissionRule(function(data) {
        return data.code === 401;
    });
    // 无权限的操作，一般跳转到登录页
    Ajax.setNoPermissionAction(function() {

    });
    // 请求错误或者网络错误的处理
    Ajax.setErrorAction(function(data) {

    });


    module.exports = {
        ajax: function(params) {
            var node = params.node;
            var loadingCls = 'loading';
            var beforeFn = function() {
                if(node) {
                    node.addClass(loadingCls);
                }
            };
            var completeFn = function() {
                if(node) {
                    node.removeClass(loadingCls);
                }
            };
            var obj = params;
            var bfn = obj.before;
            var cfn = obj.complete;
            if(typeof baseurl !== 'undefined') {
                obj.url = baseurl + obj.url;
            }
            if(typeof csrfToken !== 'undefined') {
                obj.data = obj.data || {};
                obj.data.csrfToken = csrfToken;
            }
            obj.before = function() {
                beforeFn();
                return bfn ? bfn() : true;
            };
            obj.complete = function(xhr, status) {
                completeFn();
                return cfn ? cfn() : true;
            };
            return Ajax.base(obj);
        }
    };
});