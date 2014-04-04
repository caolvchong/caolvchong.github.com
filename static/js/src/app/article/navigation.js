define(function (require, exports, module) {
    var $ = require('$');

    $(function () {
        var helper = {
            isFixed: function () {
                return navNode.css('position') === 'fixed';
            },
            bsearch: function (n, arr) {
                var low = 0;
                var high = arr.length;
                while (low < high) {

                }

                var mid = parseInt(arr.length / 2, 10);
            },
            getActiveItem: function () {
                if (isFixed) {
                    var menu;
                    var scrollTop = win.scrollTop();
                    var len = navScrollTop.length;
                    if (scrollTop >= navScrollTop[len - 1]) {
                        menu = navList.eq(len - 1);
                    } else {
                        for (var i = 0; i < len; i++) {
                            if (navScrollTop[i] - 10 > scrollTop) {
                                menu = navList.eq(Math.max(i - 1, 0));
                                break;
                            }
                        }
                    }
                    var node = navNode.find('a[href="#' + menu.attr('id') + '"]');
                    helper.highlight(node);
                    return node;
                }
            },
            highlight: function (node) {
                if (!node.hasClass(cls)) {
                    navNode.find('.' + cls).removeClass(cls);
                    node.addClass(cls);
                }
            },
            autoLayout: function() {
                if(isFixed) {
                    var space = win.height() - $('header').outerHeight(true) - $('aside.right .copyright').outerHeight(true);
                    var node = helper.getActiveItem();
                    var ulList = level1.children('ul');
                    if (space < navHeight) {
                        ulList.each(function(i, item) {
                            var ul = $(item);
                            if(item.parentNode === node.parent()[0] || $.contains(item, node[0])) {
                                ul.slideDown();
                            } else {
                                ul.slideUp();
                            }
                        });
                    } else {
                        ulList.slideDown();
                    }
                }
            }
        };

        var win = $(window);
        // 菜单高亮样式
        var cls = 'highlight';
        // 菜单容器
        var navNode = $('nav.article-nav').eq(0);
        // 一级菜单
        var level1 = navNode.find('.toc > ul > li');
        // 导航菜单总高度
        var navHeight = navNode.outerHeight();
        // 所有导航距离顶部的距离
        var navList = $('.article-content').eq(0).find('h2,h3,h4,h5,h6');
        var navScrollTop = (function () {
            var arr = [];
            navList.each(function (i, node) {
                arr[i] = $(node).offset().top;
            });
            return arr;
        })();
        // 是否是fixed
        var isFixed = helper.isFixed();
        // 上一次是否是fixed，用来判断是否进行了切换（fixed进入非fixed状态需要菜单无需再做位置定位，并且全部展开）
        var prevIsFixed = isFixed;



        helper.autoLayout();

        win.scroll(function () {
            helper.autoLayout();
        });
        win.resize(function () {
            isFixed = helper.isFixed();

            if(prevIsFixed) {
                if(!isFixed) { // fixed -> 非fixed
                    prevIsFixed = isFixed;
                    // 全部展开，去掉高亮
                    level1.children('ul').slideDown();
                    navNode.find('.' + cls).removeClass(cls);
                } else {
                    // 根据高度判断是否需要折叠，找到对应的菜单高亮
                    helper.autoLayout();
                }
            } else {
                if(isFixed) { // 非fixed -> fixed
                    prevIsFixed = isFixed;
                    // 根据高度判断是否需要折叠，找到对应的菜单高亮
                    helper.autoLayout();
                }
            }
        });
    });
});