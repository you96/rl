// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*
 *  jQuery carouFredSel 6.2.1
 *  Demo's and documentation:
 *  caroufredsel.dev7studios.com
 *
 *  Copyright (c) 2013 Fred Heusschen
 *  www.frebsite.nl
 *
 *  Dual licensed under the MIT and GPL licenses.
 *  http://en.wikipedia.org/wiki/MIT_License
 *  http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($) {
    function sc_setScroll(a, b, c) {
        return "transition" == c.transition && "swing" == b && (b = "ease"), {
            anims: [],
            duration: a,
            orgDuration: a,
            easing: b,
            startTime: getTime()
        }
    }

    function sc_startScroll(a, b) {
        for (var c = 0, d = a.anims.length; d > c; c++) {
            var e = a.anims[c];
            e && e[0][b.transition](e[1], a.duration, a.easing, e[2])
        }
    }

    function sc_stopScroll(a, b) {
        is_boolean(b) || (b = !0), is_object(a.pre) && sc_stopScroll(a.pre, b);
        for (var c = 0, d = a.anims.length; d > c; c++) {
            var e = a.anims[c];
            e[0].stop(!0), b && (e[0].css(e[1]), is_function(e[2]) && e[2]())
        }
        is_object(a.post) && sc_stopScroll(a.post, b)
    }

    function sc_afterScroll(a, b, c) {
        switch (b && b.remove(), c.fx) {
            case "fade":
            case "crossfade":
            case "cover-fade":
            case "uncover-fade":
                a.css("opacity", 1), a.css("filter", "")
        }
    }

    function sc_fireCallbacks(a, b, c, d, e) {
        if (b[c] && b[c].call(a, d), e[c].length)
            for (var f = 0, g = e[c].length; g > f; f++) e[c][f].call(a, d);
        return []
    }

    function sc_fireQueue(a, b, c) {
        return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()), b
    }

    function sc_hideHiddenItems(a) {
        a.each(function() {
            var a = $(this);
            a.data("_cfs_isHidden", a.is(":hidden")).hide()
        })
    }

    function sc_showHiddenItems(a) {
        a && a.each(function() {
            var a = $(this);
            a.data("_cfs_isHidden") || a.show()
        })
    }

    function sc_clearTimers(a) {
        return a.auto && clearTimeout(a.auto), a.progress && clearInterval(a.progress), a
    }

    function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
        return {
            width: g.width,
            height: g.height,
            items: {
                old: a,
                skipped: b,
                visible: c
            },
            scroll: {
                items: d,
                direction: e,
                duration: f
            }
        }
    }

    function sc_getDuration(a, b, c, d) {
        var e = a.duration;
        return "none" == a.fx ? 0 : ("auto" == e ? e = b.scroll.duration / b.scroll.items * c : 10 > e && (e = d / e), 1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e)))
    }

    function nv_showNavi(a, b, c) {
        var d = is_number(a.items.minimum) ? a.items.minimum : a.items.visible + 1;
        if ("show" == b || "hide" == b) var e = b;
        else if (d > b) {
            debug(c, "Not enough items (" + b + " total, " + d + " needed): Hiding navigation.");
            var e = "hide"
        } else var e = "show";
        var f = "show" == e ? "removeClass" : "addClass",
            g = cf_c("hidden", c);
        a.auto.button && a.auto.button[e]()[f](g), a.prev.button && a.prev.button[e]()[f](g), a.next.button && a.next.button[e]()[f](g), a.pagination.container && a.pagination.container[e]()[f](g)
    }

    function nv_enableNavi(a, b, c) {
        if (!a.circular && !a.infinite) {
            var d = "removeClass" == b || "addClass" == b ? b : !1,
                e = cf_c("disabled", c);
            if (a.auto.button && d && a.auto.button[d](e), a.prev.button) {
                var f = d || 0 == b ? "addClass" : "removeClass";
                a.prev.button[f](e)
            }
            if (a.next.button) {
                var f = d || b == a.items.visible ? "addClass" : "removeClass";
                a.next.button[f](e)
            }
        }
    }

    function go_getObject(a, b) {
        return is_function(b) ? b = b.call(a) : is_undefined(b) && (b = {}), b
    }

    function go_getItemsObject(a, b) {
        return b = go_getObject(a, b), is_number(b) ? b = {
            visible: b
        } : "variable" == b ? b = {
            visible: b,
            width: b,
            height: b
        } : is_object(b) || (b = {}), b
    }

    function go_getScrollObject(a, b) {
        return b = go_getObject(a, b), is_number(b) ? b = 50 >= b ? {
            items: b
        } : {
            duration: b
        } : is_string(b) ? b = {
            easing: b
        } : is_object(b) || (b = {}), b
    }

    function go_getNaviObject(a, b) {
        if (b = go_getObject(a, b), is_string(b)) {
            var c = cf_getKeyCode(b);
            b = -1 == c ? $(b) : c
        }
        return b
    }

    function go_getAutoObject(a, b) {
        return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
            button: b
        } : is_boolean(b) ? b = {
            play: b
        } : is_number(b) && (b = {
            timeoutDuration: b
        }), b.progress && (is_string(b.progress) || is_jquery(b.progress)) && (b.progress = {
            bar: b.progress
        }), b
    }

    function go_complementAutoObject(a, b) {
        return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_boolean(b.play) || (b.play = !0), is_number(b.delay) || (b.delay = 0), is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0), is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0), is_number(b.timeoutDuration) || (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration), b.progress && (is_function(b.progress.bar) && (b.progress.bar = b.progress.bar.call(a)), is_string(b.progress.bar) && (b.progress.bar = $(b.progress.bar)), b.progress.bar ? (is_function(b.progress.updater) || (b.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(b.progress.interval) || (b.progress.interval = 50)) : b.progress = !1), b
    }

    function go_getPrevNextObject(a, b) {
        return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
            button: b
        } : is_number(b) && (b = {
            key: b
        }), b
    }

    function go_complementPrevNextObject(a, b) {
        return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_string(b.key) && (b.key = cf_getKeyCode(b.key)), b
    }

    function go_getPaginationObject(a, b) {
        return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
            container: b
        } : is_boolean(b) && (b = {
            keys: b
        }), b
    }

    function go_complementPaginationObject(a, b) {
        return is_function(b.container) && (b.container = b.container.call(a)), is_string(b.container) && (b.container = $(b.container)), is_number(b.items) || (b.items = !1), is_boolean(b.keys) || (b.keys = !1), is_function(b.anchorBuilder) || is_false(b.anchorBuilder) || (b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(b.deviation) || (b.deviation = 0), b
    }

    function go_getSwipeObject(a, b) {
        return is_function(b) && (b = b.call(a)), is_undefined(b) && (b = {
            onTouch: !1
        }), is_true(b) ? b = {
            onTouch: b
        } : is_number(b) && (b = {
            items: b
        }), b
    }

    function go_complementSwipeObject(a, b) {
        return is_boolean(b.onTouch) || (b.onTouch = !0), is_boolean(b.onMouse) || (b.onMouse = !1), is_object(b.options) || (b.options = {}), is_boolean(b.options.triggerOnTouchEnd) || (b.options.triggerOnTouchEnd = !1), b
    }

    function go_getMousewheelObject(a, b) {
        return is_function(b) && (b = b.call(a)), is_true(b) ? b = {} : is_number(b) ? b = {
            items: b
        } : is_undefined(b) && (b = !1), b
    }

    function go_complementMousewheelObject(a, b) {
        return b
    }

    function gn_getItemIndex(a, b, c, d, e) {
        if (is_string(a) && (a = $(a, e)), is_object(a) && (a = $(a, e)), is_jquery(a) ? (a = e.children().index(a), is_boolean(c) || (c = !1)) : is_boolean(c) || (c = !0), is_number(a) || (a = 0), is_number(b) || (b = 0), c && (a += d.first), a += b, d.total > 0) {
            for (; a >= d.total;) a -= d.total;
            for (; 0 > a;) a += d.total
        }
        return a
    }

    function gn_getVisibleItemsPrev(a, b, c) {
        for (var d = 0, e = 0, f = c; f >= 0; f--) {
            var g = a.eq(f);
            if (d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
            0 == f && (f = a.length), e++
        }
    }

    function gn_getVisibleItemsPrevFilter(a, b, c) {
        return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c)
    }

    function gn_getScrollItemsPrevFilter(a, b, c, d) {
        return gn_getItemsPrevFilter(a, b.items.filter, d, c)
    }

    function gn_getItemsPrevFilter(a, b, c, d) {
        for (var e = 0, f = 0, g = d, h = a.length; g >= 0; g--) {
            if (f++, f == h) return f;
            var i = a.eq(g);
            if (i.is(b) && (e++, e == c)) return f;
            0 == g && (g = h)
        }
    }

    function gn_getVisibleOrg(a, b) {
        return b.items.visibleConf.org || a.children().slice(0, b.items.visible).filter(b.items.filter).length
    }

    function gn_getVisibleItemsNext(a, b, c) {
        for (var d = 0, e = 0, f = c, g = a.length - 1; g >= f; f++) {
            var h = a.eq(f);
            if (d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
            if (e++, e == g + 1) return e;
            f == g && (f = -1)
        }
    }

    function gn_getVisibleItemsNextTestCircular(a, b, c, d) {
        var e = gn_getVisibleItemsNext(a, b, c);
        return b.circular || c + e > d && (e = d - c), e
    }

    function gn_getVisibleItemsNextFilter(a, b, c) {
        return gn_getItemsNextFilter(a, b.items.filter, b.items.visibleConf.org, c, b.circular)
    }

    function gn_getScrollItemsNextFilter(a, b, c, d) {
        return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1
    }

    function gn_getItemsNextFilter(a, b, c, d) {
        for (var f = 0, g = 0, h = d, i = a.length - 1; i >= h; h++) {
            if (g++, g >= i) return g;
            var j = a.eq(h);
            if (j.is(b) && (f++, f == c)) return g;
            h == i && (h = -1)
        }
    }

    function gi_getCurrentItems(a, b) {
        return a.slice(0, b.items.visible)
    }

    function gi_getOldItemsPrev(a, b, c) {
        return a.slice(c, b.items.visibleConf.old + c)
    }

    function gi_getNewItemsPrev(a, b) {
        return a.slice(0, b.items.visible)
    }

    function gi_getOldItemsNext(a, b) {
        return a.slice(0, b.items.visibleConf.old)
    }

    function gi_getNewItemsNext(a, b, c) {
        return a.slice(c, b.items.visible + c)
    }

    function sz_storeMargin(a, b, c) {
        b.usePadding && (is_string(c) || (c = "_cfs_origCssMargin"), a.each(function() {
            var a = $(this),
                d = parseInt(a.css(b.d.marginRight), 10);
            is_number(d) || (d = 0), a.data(c, d)
        }))
    }

    function sz_resetMargin(a, b, c) {
        if (b.usePadding) {
            var d = is_boolean(c) ? c : !1;
            is_number(c) || (c = 0), sz_storeMargin(a, b, "_cfs_tempCssMargin"), a.each(function() {
                var a = $(this);
                a.css(b.d.marginRight, d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin"))
            })
        }
    }

    function sz_storeOrigCss(a) {
        a.each(function() {
            var a = $(this);
            a.data("_cfs_origCss", a.attr("style") || "")
        })
    }

    function sz_restoreOrigCss(a) {
        a.each(function() {
            var a = $(this);
            a.attr("style", a.data("_cfs_origCss") || "")
        })
    }

    function sz_setResponsiveSizes(a, b) {
        var d = (a.items.visible, a.items[a.d.width]),
            e = a[a.d.height],
            f = is_percentage(e);
        b.each(function() {
            var b = $(this),
                c = d - ms_getPaddingBorderMargin(b, a, "Width");
            b[a.d.width](c), f && b[a.d.height](ms_getPercentage(c, e))
        })
    }

    function sz_setSizes(a, b) {
        var c = a.parent(),
            d = a.children(),
            e = gi_getCurrentItems(d, b),
            f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1);
        if (c.css(f), b.usePadding) {
            var g = b.padding,
                h = g[b.d[1]];
            b.align && 0 > h && (h = 0);
            var i = e.last();
            i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h), a.css(b.d.top, g[b.d[0]]), a.css(b.d.left, g[b.d[3]])
        }
        return a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")), a.css(b.d.height, ms_getLargestSize(d, b, "height")), f
    }

    function ms_getSizes(a, b, c) {
        return [ms_getTotalSize(a, b, "width", c), ms_getLargestSize(a, b, "height", c)]
    }

    function ms_getLargestSize(a, b, c, d) {
        return is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d ? b[b.d[c]] : is_number(b.items[b.d[c]]) ? b.items[b.d[c]] : (c = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(a, b, c))
    }

    function ms_getTrueLargestSize(a, b, c) {
        for (var d = 0, e = 0, f = a.length; f > e; e++) {
            var g = a.eq(e),
                h = g.is(":visible") ? g[b.d[c]](!0) : 0;
            h > d && (d = h)
        }
        return d
    }

    function ms_getTotalSize(a, b, c, d) {
        if (is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d) return b[b.d[c]];
        if (is_number(b.items[b.d[c]])) return b.items[b.d[c]] * a.length;
        for (var e = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", f = 0, g = 0, h = a.length; h > g; g++) {
            var i = a.eq(g);
            f += i.is(":visible") ? i[b.d[e]](!0) : 0
        }
        return f
    }

    function ms_getParentSize(a, b, c) {
        var d = a.is(":visible");
        d && a.hide();
        var e = a.parent()[b.d[c]]();
        return d && a.show(), e
    }

    function ms_getMaxDimension(a, b) {
        return is_number(a[a.d.width]) ? a[a.d.width] : b
    }

    function ms_hasVariableSizes(a, b, c) {
        for (var d = !1, e = !1, f = 0, g = a.length; g > f; f++) {
            var h = a.eq(f),
                i = h.is(":visible") ? h[b.d[c]](!0) : 0;
            d === !1 ? d = i : d != i && (e = !0), 0 == d && (e = !0)
        }
        return e
    }

    function ms_getPaddingBorderMargin(a, b, c) {
        return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]()
    }

    function ms_getPercentage(a, b) {
        if (is_percentage(b)) {
            if (b = parseInt(b.slice(0, -1), 10), !is_number(b)) return a;
            a *= b / 100
        }
        return a
    }

    function cf_e(a, b, c, d, e) {
        return is_boolean(c) || (c = !0), is_boolean(d) || (d = !0), is_boolean(e) || (e = !1), c && (a = b.events.prefix + a), d && (a = a + "." + b.events.namespace), d && e && (a += b.serialNumber), a
    }

    function cf_c(a, b) {
        return is_string(b.classnames[a]) ? b.classnames[a] : a
    }

    function cf_mapWrapperSizes(a, b, c) {
        is_boolean(c) || (c = !0);
        var d = b.usePadding && c ? b.padding : [0, 0, 0, 0],
            e = {};
        return e[b.d.width] = a[0] + d[1] + d[3], e[b.d.height] = a[1] + d[0] + d[2], e
    }

    function cf_sortParams(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++)
            for (var f = 0, g = b.length; g > f; f++)
                if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) {
                    c[f] = a[d];
                    break
                }
        return c
    }

    function cf_getPadding(a) {
        if (is_undefined(a)) return [0, 0, 0, 0];
        if (is_number(a)) return [a, a, a, a];
        if (is_string(a) && (a = a.split("px").join("").split("em").join("").split(" ")), !is_array(a)) return [0, 0, 0, 0];
        for (var b = 0; 4 > b; b++) a[b] = parseInt(a[b], 10);
        switch (a.length) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                return [a[0], a[0], a[0], a[0]];
            case 2:
                return [a[0], a[1], a[0], a[1]];
            case 3:
                return [a[0], a[1], a[2], a[1]];
            default:
                return [a[0], a[1], a[2], a[3]]
        }
    }

    function cf_getAlignPadding(a, b) {
        var c = is_number(b[b.d.width]) ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width")) : 0;
        switch (b.align) {
            case "left":
                return [0, c];
            case "right":
                return [c, 0];
            case "center":
            default:
                return [Math.ceil(c / 2), Math.floor(c / 2)]
        }
    }

    function cf_getDimensions(a) {
        for (var b = [
            ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
            ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
        ], c = b[0].length, d = "right" == a.direction || "left" == a.direction ? 0 : 1, e = {}, f = 0; c > f; f++) e[b[0][f]] = b[d][f];
        return e
    }

    function cf_getAdjust(a, b, c, d) {
        var e = a;
        if (is_function(c)) e = c.call(d, e);
        else if (is_string(c)) {
            var f = c.split("+"),
                g = c.split("-");
            if (g.length > f.length) var h = !0,
            i = g[0], j = g[1];
            else var h = !1,
            i = f[0], j = f[1];
            switch (i) {
                case "even":
                    e = 1 == a % 2 ? a - 1 : a;
                    break;
                case "odd":
                    e = 0 == a % 2 ? a - 1 : a;
                    break;
                default:
                    e = a
            }
            j = parseInt(j, 10), is_number(j) && (h && (j = -j), e += j)
        }
        return (!is_number(e) || 1 > e) && (e = 1), e
    }

    function cf_getItemsAdjust(a, b, c, d) {
        return cf_getItemAdjustMinMax(cf_getAdjust(a, b, c, d), b.items.visibleConf)
    }

    function cf_getItemAdjustMinMax(a, b) {
        return is_number(b.min) && b.min > a && (a = b.min), is_number(b.max) && a > b.max && (a = b.max), 1 > a && (a = 1), a
    }

    function cf_getSynchArr(a) {
        is_array(a) || (a = [
            [a]
        ]), is_array(a[0]) || (a = [a]);
        for (var b = 0, c = a.length; c > b; b++) is_string(a[b][0]) && (a[b][0] = $(a[b][0])), is_boolean(a[b][1]) || (a[b][1] = !0), is_boolean(a[b][2]) || (a[b][2] = !0), is_number(a[b][3]) || (a[b][3] = 0);
        return a
    }

    function cf_getKeyCode(a) {
        return "right" == a ? 39 : "left" == a ? 37 : "up" == a ? 38 : "down" == a ? 40 : -1
    }

    function cf_setCookie(a, b, c) {
        if (a) {
            var d = b.triggerHandler(cf_e("currentPosition", c));
            $.fn.carouFredSel.cookie.set(a, d)
        }
    }

    function cf_getCookie(a) {
        var b = $.fn.carouFredSel.cookie.get(a);
        return "" == b ? 0 : b
    }

    function in_mapCss(a, b) {
        for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = a.css(b[d]);
        return c
    }

    function in_complementItems(a, b, c, d) {
        return is_object(a.visibleConf) || (a.visibleConf = {}), is_object(a.sizesConf) || (a.sizesConf = {}), 0 == a.start && is_number(d) && (a.start = d), is_object(a.visible) ? (a.visibleConf.min = a.visible.min, a.visibleConf.max = a.visible.max, a.visible = !1) : is_string(a.visible) ? ("variable" == a.visible ? a.visibleConf.variable = !0 : a.visibleConf.adjust = a.visible, a.visible = !1) : is_function(a.visible) && (a.visibleConf.adjust = a.visible, a.visible = !1), is_string(a.filter) || (a.filter = c.filter(":hidden").length > 0 ? ":visible" : "*"), a[b.d.width] || (b.responsive ? (debug(!0, "Set a " + b.d.width + " for the items!"), a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")) : a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth") ? "variable" : c[b.d.outerWidth](!0)), a[b.d.height] || (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight") ? "variable" : c[b.d.outerHeight](!0)), a.sizesConf.width = a.width, a.sizesConf.height = a.height, a
    }

    function in_complementVisibleItems(a, b) {
        return "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0), a.items.visibleConf.variable || (is_number(a[a.d.width]) ? a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]) : (a.items.visible = Math.floor(b / a.items[a.d.width]), a[a.d.width] = a.items.visible * a.items[a.d.width], a.items.visibleConf.adjust || (a.align = !1)), ("Infinity" == a.items.visible || 1 > a.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), a.items.visibleConf.variable = !0)), a
    }

    function in_complementPrimarySize(a, b, c) {
        return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")), a
    }

    function in_complementSecondarySize(a, b, c) {
        return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")), a || (a = b.items[b.d.height]), a
    }

    function in_getAlignPadding(a, b) {
        var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a);
        return a.padding[a.d[1]] = c[1], a.padding[a.d[3]] = c[0], a
    }

    function in_getResponsiveValues(a, b) {
        var d = cf_getItemAdjustMinMax(Math.ceil(a[a.d.width] / a.items[a.d.width]), a.items.visibleConf);
        d > b.length && (d = b.length);
        var e = Math.floor(a[a.d.width] / d);
        return a.items.visible = d, a.items[a.d.width] = e, a[a.d.width] = d * e, a
    }

    function bt_pauseOnHoverConfig(a) {
        if (is_string(a)) var b = a.indexOf("immediate") > -1 ? !0 : !1,
        c = a.indexOf("resume") > -1 ? !0 : !1;
        else var b = c = !1;
        return [b, c]
    }

    function bt_mousesheelNumber(a) {
        return is_number(a) ? a : null
    }

    function is_null(a) {
        return null === a
    }

    function is_undefined(a) {
        return is_null(a) || a === void 0 || "" === a || "undefined" === a
    }

    function is_array(a) {
        return a instanceof Array
    }

    function is_jquery(a) {
        return a instanceof jQuery
    }

    function is_object(a) {
        return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a)
    }

    function is_number(a) {
        return (a instanceof Number || "number" == typeof a) && !isNaN(a)
    }

    function is_string(a) {
        return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a)
    }

    function is_function(a) {
        return a instanceof Function || "function" == typeof a
    }

    function is_boolean(a) {
        return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
    }

    function is_true(a) {
        return a === !0 || "true" === a
    }

    function is_false(a) {
        return a === !1 || "false" === a
    }

    function is_percentage(a) {
        return is_string(a) && "%" == a.slice(-1)
    }

    function getTime() {
        return (new Date).getTime()
    }

    function deprecated(a, b) {
        debug(!0, a + " is DEPRECATED, support for it will be removed. Use " + b + " instead.")
    }

    function debug(a, b) {
        if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
            if (is_object(a)) {
                var c = " (" + a.selector + ")";
                a = a.debug
            } else var c = ""; if (!a) return !1;
            b = is_string(b) ? "carouFredSel" + c + ": " + b : ["carouFredSel" + c + ":", b], window.console.log(b)
        }
        return !1
    }
    $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
        if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
        if (this.length > 1) return this.each(function() {
            $(this).carouFredSel(options, configs)
        });
        var $cfs = this,
            $tt0 = this[0],
            starting_position = !1;
        $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        FN._init = function(a, b, c) {
            a = go_getObject($tt0, a), a.items = go_getItemsObject($tt0, a.items), a.scroll = go_getScrollObject($tt0, a.scroll), a.auto = go_getAutoObject($tt0, a.auto), a.prev = go_getPrevNextObject($tt0, a.prev), a.next = go_getPrevNextObject($tt0, a.next), a.pagination = go_getPaginationObject($tt0, a.pagination), a.swipe = go_getSwipeObject($tt0, a.swipe), a.mousewheel = go_getMousewheelObject($tt0, a.mousewheel), b && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, a), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
            var d = $cfs.children(),
                e = ms_getParentSize($wrp, opts, "width");
            if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, e), opts.items = in_complementItems(opts.items, opts, d, c), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, d), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, d), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(e, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, e)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, d, e);
            else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
                case "center":
                case "left":
                case "right":
                    "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, d), opts.usePadding = !0);
                    break;
                default:
                    opts.align = !1, opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0
            }
            is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
        }, FN._build = function() {
            $cfs.data("_cfs_isCarousel", !0);
            var a = $cfs.children(),
                b = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                c = "relative";
            switch (b.position) {
                case "absolute":
                case "fixed":
                    c = b.position
            }
            "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(b), $wrp.css({
                overflow: "hidden",
                position: c
            }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", b.zIndex), $cfs.css({
                textAlign: "left",
                "float": "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }), sz_storeMargin(a, opts), sz_storeOrigCss(a), opts.responsive && sz_setResponsiveSizes(opts, a)
        }, FN._bind_events = function() {
            FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(a, b) {
                return a.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), b)), !0
            }), $cfs.bind(cf_e("finish", conf), function(a) {
                return a.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
            }), $cfs.bind(cf_e("pause", conf), function(a, b, c) {
                if (a.stopPropagation(), tmrs = sc_clearTimers(tmrs), b && crsl.isScrolling) {
                    scrl.isStopped = !0;
                    var d = getTime() - scrl.startTime;
                    scrl.duration -= d, scrl.pre && (scrl.pre.duration -= d), scrl.post && (scrl.post.duration -= d), sc_stopScroll(scrl, !1)
                }
                if (crsl.isPaused || crsl.isScrolling || c && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                    var e = opts.auto.timeoutDuration - tmrs.timePassed,
                        f = 100 - Math.ceil(100 * e / opts.auto.timeoutDuration);
                    opts.auto.onTimeoutPause.call($tt0, f, e)
                }
                return !0
            }), $cfs.bind(cf_e("play", conf), function(a, b, c, d) {
                a.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                var e = [b, c, d],
                    f = ["string", "number", "boolean"],
                    g = cf_sortParams(e, f);
                if (b = g[0], c = g[1], d = g[2], "prev" != b && "next" != b && (b = crsl.direction), is_number(c) || (c = 0), is_boolean(d) || (d = !1), d && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                var h = opts.auto.timeoutDuration + c;
                return dur2 = h - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / h), opts.auto.progress && (tmrs.progress = setInterval(function() {
                    var a = getTime() - tmrs.startTime + tmrs.timePassed,
                        b = Math.ceil(100 * a / h);
                    opts.auto.progress.updater.call(opts.auto.progress.bar[0], b)
                }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
                    opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), b) : $cfs.trigger(cf_e(b, conf), opts.auto)
                }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
            }), $cfs.bind(cf_e("resume", conf), function(a) {
                return a.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
            }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(a, b, c, d, e) {
                if (a.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                var f = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                if (f > itms.total) return a.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + f + " needed): Not scrolling.");
                var g = [b, c, d, e],
                    h = ["object", "number/string", "function", "boolean"],
                    i = cf_sortParams(g, h);
                b = i[0], c = i[1], d = i[2], e = i[3];
                var j = a.type.slice(conf.events.prefix.length);
                if (is_object(b) || (b = {}), is_function(d) && (b.onAfter = d), is_boolean(e) && (b.queue = e), b = $.extend(!0, {}, opts[j], b), b.conditions && !b.conditions.call($tt0, j)) return a.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                if (!is_number(c)) {
                    if ("*" != opts.items.filter) c = "visible";
                    else
                        for (var k = [c, b.items, opts[j].items], i = 0, l = k.length; l > i; i++)
                            if (is_number(k[i]) || "page" == k[i] || "visible" == k[i]) {
                                c = k[i];
                                break
                            } switch (c) {
                        case "page":
                            return a.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(j + "Page", conf), [b, d]);
                        case "visible":
                            opts.items.visibleConf.variable || "*" != opts.items.filter || (c = opts.items.visible)
                    }
                }
                if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]]), a.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                if (b.duration > 0 && crsl.isScrolling) return b.queue && ("last" == b.queue && (queu = []), ("first" != b.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]])), a.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + j, conf), [b, c]), opts.synchronise)
                    for (var m = opts.synchronise, n = [b, c], o = 0, l = m.length; l > o; o++) {
                        var p = j;
                        m[o][2] || (p = "prev" == p ? "next" : "prev"), m[o][1] || (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", ["configuration", p])), n[1] = c + m[o][3], m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n])
                    }
                return !0
            }), $cfs.bind(cf_e("slide_prev", conf), function(a, b, c) {
                a.stopPropagation();
                var d = $cfs.children();
                if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), a.stopImmediatePropagation();
                if (sz_resetMargin(d, opts), !is_number(c)) {
                    if (opts.items.visibleConf.variable) c = gn_getVisibleItemsPrev(d, opts, itms.total - 1);
                    else if ("*" != opts.items.filter) {
                        var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
                        c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e)
                    } else c = opts.items.visible;
                    c = cf_getAdjust(c, opts, b.items, $tt0)
                }
                if (opts.circular || itms.total - c < itms.first && (c = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    var f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0);
                    f >= opts.items.visible + c && itms.total > c && (c++, f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = f
                } else if ("*" != opts.items.filter) {
                    var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
                    opts.items.visible = cf_getItemsAdjust(f, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + c + " items backward."), itms.first += c; itms.first >= itms.total;) itms.first -= itms.total;
                opts.circular || (0 == itms.first && b.onEnd && b.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - c, itms.total).prependTo($cfs), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
                var d = $cfs.children(),
                    g = gi_getOldItemsPrev(d, opts, c),
                    h = gi_getNewItemsPrev(d, opts),
                    i = d.eq(c - 1),
                    j = g.last(),
                    k = h.last();
                sz_resetMargin(d, opts);
                var l = 0,
                    m = 0;
                if (opts.align) {
                    var n = cf_getAlignPadding(h, opts);
                    l = n[0], m = n[1]
                }
                var o = 0 > l ? opts.padding[opts.d[3]] : 0,
                    p = !1,
                    q = $();
                if (c > opts.items.visible && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
                    var r = opts.items[opts.d.width];
                    p = q, i = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
                }
                var s = !1,
                    t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                    u = cf_mapWrapperSizes(ms_getSizes(h, opts, !0), opts, !opts.usePadding),
                    v = 0,
                    w = {}, x = {}, y = {}, z = {}, A = {}, B = {}, C = {}, D = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                    case "cover":
                    case "cover-fade":
                        v = ms_getTotalSize(d.slice(0, opts.items.visible), opts, "width")
                }
                p && (opts.items[opts.d.width] = r), sz_resetMargin(d, opts, !0), m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]), l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = m, opts.padding[opts.d[3]] = l), B[opts.d.left] = -(t - o), C[opts.d.left] = -(v - o), x[opts.d.left] = u[opts.d.width];
                var E = function() {}, F = function() {}, G = function() {}, H = function() {}, I = function() {}, J = function() {}, K = function() {}, L = function() {}, M = function() {}, N = function() {}, O = function() {};
                switch (b.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        s = $cfs.clone(!0).appendTo($wrp)
                }
                switch (b.fx) {
                    case "crossfade":
                    case "uncover":
                    case "uncover-fade":
                        s.children().slice(0, c).remove(), s.children().slice(opts.items.visibleConf.old).remove();
                        break;
                    case "cover":
                    case "cover-fade":
                        s.children().slice(opts.items.visible).remove(), s.css(C)
                }
                if ($cfs.css(B), scrl = sc_setScroll(D, b.easing, conf), w[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (E = function() {
                    $wrp.css(u)
                }, F = function() {
                    scrl.anims.push([$wrp, u])
                }), opts.usePadding) {
                    switch (k.not(i).length && (y[opts.d.marginRight] = i.data("_cfs_origCssMargin"), 0 > l ? i.css(y) : (K = function() {
                        i.css(y)
                    }, L = function() {
                        scrl.anims.push([i, y])
                    })), b.fx) {
                        case "cover":
                        case "cover-fade":
                            s.children().eq(c - 1).css(y)
                    }
                    k.not(j).length && (z[opts.d.marginRight] = j.data("_cfs_origCssMargin"), G = function() {
                        j.css(z)
                    }, H = function() {
                        scrl.anims.push([j, z])
                    }), m >= 0 && (A[opts.d.marginRight] = k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], I = function() {
                        k.css(A)
                    }, J = function() {
                        scrl.anims.push([k, A])
                    })
                }
                O = function() {
                    $cfs.css(w)
                };
                var P = opts.items.visible + c - itms.total;
                N = function() {
                    if (P > 0 && ($cfs.children().slice(itms.total).remove(), g = $($cfs.children().slice(itms.total - (opts.items.visible - P)).get().concat($cfs.children().slice(0, P).get()))), sc_showHiddenItems(p), opts.usePadding) {
                        var a = $cfs.children().eq(opts.items.visible + c - 1);
                        a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
                    }
                };
                var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u);
                switch (M = function() {
                    sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", Q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", Q, clbk), b.fx) {
                    case "none":
                        $cfs.css(w), E(), G(), I(), K(), O(), N(), M();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                                opacity: 0
                            },
                            function() {
                                E(), G(), I(), K(), O(), N(), scrl = sc_setScroll(D, b.easing, conf), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    },
                                    M
                                ]), sc_startScroll(scrl, conf)
                            }
                        ]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([s, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            },
                            M
                        ]), F(), G(), I(), K(), O(), N();
                        break;
                    case "cover":
                        scrl.anims.push([s, w,
                            function() {
                                G(), I(), K(), O(), N(), M()
                            }
                        ]), F();
                        break;
                    case "cover-fade":
                        scrl.anims.push([$cfs, {
                            opacity: 0
                        }]), scrl.anims.push([s, w,
                            function() {
                                G(), I(), K(), O(), N(), M()
                            }
                        ]), F();
                        break;
                    case "uncover":
                        scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
                        break;
                    default:
                        scrl.anims.push([$cfs, w,
                            function() {
                                N(), M()
                            }
                        ]), F(), H(), J(), L()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
            }), $cfs.bind(cf_e("slide_next", conf), function(a, b, c) {
                a.stopPropagation();
                var d = $cfs.children();
                if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), a.stopImmediatePropagation();
                if (sz_resetMargin(d, opts), !is_number(c)) {
                    if ("*" != opts.items.filter) {
                        var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
                        c = gn_getScrollItemsNextFilter(d, opts, 0, e)
                    } else c = opts.items.visible;
                    c = cf_getAdjust(c, opts, b.items, $tt0)
                }
                var f = 0 == itms.first ? itms.total : itms.first;
                if (!opts.circular) {
                    if (opts.items.visibleConf.variable) var g = gn_getVisibleItemsNext(d, opts, c),
                    e = gn_getVisibleItemsPrev(d, opts, f - 1);
                    else var g = opts.items.visible,
                    e = opts.items.visible;
                    c + g > f && (c = f - e)
                }
                if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    for (var g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - c >= g && itms.total > c;) c++, g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0);
                    opts.items.visible = g
                } else if ("*" != opts.items.filter) {
                    var g = gn_getVisibleItemsNextFilter(d, opts, c);
                    opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + c + " items forward."), itms.first -= c; 0 > itms.first;) itms.first += itms.total;
                opts.circular || (itms.first == opts.items.visible && b.onEnd && b.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
                var d = $cfs.children(),
                    h = gi_getOldItemsNext(d, opts),
                    i = gi_getNewItemsNext(d, opts, c),
                    j = d.eq(c - 1),
                    k = h.last(),
                    l = i.last();
                sz_resetMargin(d, opts);
                var m = 0,
                    n = 0;
                if (opts.align) {
                    var o = cf_getAlignPadding(i, opts);
                    m = o[0], n = o[1]
                }
                var p = !1,
                    q = $();
                if (c > opts.items.visibleConf.old && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
                    var r = opts.items[opts.d.width];
                    p = q, j = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
                }
                var s = !1,
                    t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                    u = cf_mapWrapperSizes(ms_getSizes(i, opts, !0), opts, !opts.usePadding),
                    v = 0,
                    w = {}, x = {}, y = {}, z = {}, A = {}, B = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                    case "uncover":
                    case "uncover-fade":
                        v = ms_getTotalSize(d.slice(0, opts.items.visibleConf.old), opts, "width")
                }
                p && (opts.items[opts.d.width] = r), opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0), sz_resetMargin(d, opts, !0), sz_resetMargin(k, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = n, opts.padding[opts.d[3]] = m), A[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                var C = function() {}, D = function() {}, E = function() {}, F = function() {}, G = function() {}, H = function() {}, I = function() {}, J = function() {}, K = function() {};
                switch (b.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        s = $cfs.clone(!0).appendTo($wrp), s.children().slice(opts.items.visibleConf.old).remove()
                }
                switch (b.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                        $cfs.css("zIndex", 1), s.css("zIndex", 0)
                }
                if (scrl = sc_setScroll(B, b.easing, conf), w[opts.d.left] = -t, x[opts.d.left] = -v, 0 > m && (w[opts.d.left] += m), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (C = function() {
                    $wrp.css(u)
                }, D = function() {
                    scrl.anims.push([$wrp, u])
                }), opts.usePadding) {
                    var L = l.data("_cfs_origCssMargin");
                    n >= 0 && (L += opts.padding[opts.d[1]]), l.css(opts.d.marginRight, L), j.not(k).length && (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")), E = function() {
                        k.css(z)
                    }, F = function() {
                        scrl.anims.push([k, z])
                    };
                    var M = j.data("_cfs_origCssMargin");
                    m > 0 && (M += opts.padding[opts.d[3]]), y[opts.d.marginRight] = M, G = function() {
                        j.css(y)
                    }, H = function() {
                        scrl.anims.push([j, y])
                    }
                }
                K = function() {
                    $cfs.css(A)
                };
                var N = opts.items.visible + c - itms.total;
                J = function() {
                    N > 0 && $cfs.children().slice(itms.total).remove();
                    var a = $cfs.children().slice(0, c).appendTo($cfs).last();
                    if (N > 0 && (i = gi_getCurrentItems(d, opts)), sc_showHiddenItems(p), opts.usePadding) {
                        if (itms.total < opts.items.visible + c) {
                            var b = $cfs.children().eq(opts.items.visible - 1);
                            b.css(opts.d.marginRight, b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                        }
                        a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
                    }
                };
                var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u);
                switch (I = function() {
                    $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", O, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", O, clbk), b.fx) {
                    case "none":
                        $cfs.css(w), C(), E(), G(), K(), J(), I();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                                opacity: 0
                            },
                            function() {
                                C(), E(), G(), K(), J(), scrl = sc_setScroll(B, b.easing, conf), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    },
                                    I
                                ]), sc_startScroll(scrl, conf)
                            }
                        ]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([s, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            },
                            I
                        ]), D(), E(), G(), K(), J();
                        break;
                    case "cover":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
                        break;
                    case "cover-fade":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([s, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
                        break;
                    case "uncover":
                        scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
                        break;
                    default:
                        scrl.anims.push([$cfs, w,
                            function() {
                                K(), J(), I()
                            }
                        ]), D(), F(), H()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
            }), $cfs.bind(cf_e("slideTo", conf), function(a, b, c, d, e, f, g) {
                a.stopPropagation();
                var h = [b, c, d, e, f, g],
                    i = ["string/number/object", "number", "boolean", "object", "string", "function"],
                    j = cf_sortParams(h, i);
                return e = j[3], f = j[4], g = j[5], b = gn_getItemIndex(j[0], j[1], j[2], itms, $cfs), 0 == b ? !1 : (is_object(e) || (e = !1), "prev" != f && "next" != f && (f = opts.circular ? itms.total / 2 >= b ? "next" : "prev" : 0 == itms.first || itms.first > b ? "next" : "prev"), "prev" == f && (b = itms.total - b), $cfs.trigger(cf_e(f, conf), [e, b, g]), !0)
            }), $cfs.bind(cf_e("prevPage", conf), function(a, b, c) {
                a.stopPropagation();
                var d = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [d - 1, b, "prev", c])
            }), $cfs.bind(cf_e("nextPage", conf), function(a, b, c) {
                a.stopPropagation();
                var d = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [d + 1, b, "next", c])
            }), $cfs.bind(cf_e("slideToPage", conf), function(a, b, c, d, e) {
                a.stopPropagation(), is_number(b) || (b = $cfs.triggerHandler(cf_e("currentPage", conf)));
                var f = opts.pagination.items || opts.items.visible,
                    g = Math.ceil(itms.total / f) - 1;
                return 0 > b && (b = g), b > g && (b = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [b * f, 0, !0, c, d, e])
            }), $cfs.bind(cf_e("jumpToStart", conf), function(a, b) {
                if (a.stopPropagation(), b = b ? gn_getItemIndex(b, 0, !0, itms, $cfs) : 0, b += itms.first, 0 != b) {
                    if (itms.total > 0)
                        for (; b > itms.total;) b -= itms.total;
                    $cfs.prepend($cfs.children().slice(b, itms.total))
                }
                return !0
            }), $cfs.bind(cf_e("synchronise", conf), function(a, b) {
                if (a.stopPropagation(), b) b = cf_getSynchArr(b);
                else {
                    if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                    b = opts.synchronise
                }
                for (var c = $cfs.triggerHandler(cf_e("currentPosition", conf)), d = !0, e = 0, f = b.length; f > e; e++) b[e][0].triggerHandler(cf_e("slideTo", conf), [c, b[e][3], !0]) || (d = !1);
                return d
            }), $cfs.bind(cf_e("queue", conf), function(a, b, c) {
                return a.stopPropagation(), is_function(b) ? b.call($tt0, queu) : is_array(b) ? queu = b : is_undefined(b) || queu.push([b, c]), queu
            }), $cfs.bind(cf_e("insertItem", conf), function(a, b, c, d, e) {
                a.stopPropagation();
                var f = [b, c, d, e],
                    g = ["string/object", "string/number/object", "boolean", "number"],
                    h = cf_sortParams(f, g);
                if (b = h[0], c = h[1], d = h[2], e = h[3], is_object(b) && !is_jquery(b) ? b = $(b) : is_string(b) && (b = $(b)), !is_jquery(b) || 0 == b.length) return debug(conf, "Not a valid object.");
                is_undefined(c) && (c = "end"), sz_storeMargin(b, opts), sz_storeOrigCss(b);
                var i = c,
                    j = "before";
                "end" == c ? d ? (0 == itms.first ? (c = itms.total - 1, j = "after") : (c = itms.first, itms.first += b.length), 0 > c && (c = 0)) : (c = itms.total - 1, j = "after") : c = gn_getItemIndex(c, e, d, itms, $cfs);
                var k = $cfs.children().eq(c);
                return k.length ? k[j](b) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(b)), "end" == i || d || itms.first > c && (itms.first += b.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
            }), $cfs.bind(cf_e("removeItem", conf), function(a, b, c, d) {
                a.stopPropagation();
                var e = [b, c, d],
                    f = ["string/number/object", "boolean", "number"],
                    g = cf_sortParams(e, f);
                if (b = g[0], c = g[1], d = g[2], b instanceof $ && b.length > 1) return i = $(), b.each(function() {
                    var e = $cfs.trigger(cf_e("removeItem", conf), [$(this), c, d]);
                    e && (i = i.add(e))
                }), i;
                if (is_undefined(b) || "end" == b) i = $cfs.children().last();
                else {
                    b = gn_getItemIndex(b, d, c, itms, $cfs);
                    var i = $cfs.children().eq(b);
                    i.length && itms.first > b && (itms.first -= i.length)
                }
                return i && i.length && (i.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), i
            }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(a, b) {
                a.stopPropagation();
                var c = a.type.slice(conf.events.prefix.length);
                return is_array(b) && (clbk[c] = b), is_function(b) && clbk[c].push(b), clbk[c]
            }), $cfs.bind(cf_e("currentPosition", conf), function(a, b) {
                if (a.stopPropagation(), 0 == itms.first) var c = 0;
                else var c = itms.total - itms.first;
                return is_function(b) && b.call($tt0, c), c
            }), $cfs.bind(cf_e("currentPage", conf), function(a, b) {
                a.stopPropagation();
                var e, c = opts.pagination.items || opts.items.visible,
                    d = Math.ceil(itms.total / c - 1);
                return e = 0 == itms.first ? 0 : itms.first < itms.total % c ? 0 : itms.first != c || opts.circular ? Math.round((itms.total - itms.first) / c) : d, 0 > e && (e = 0), e > d && (e = d), is_function(b) && b.call($tt0, e), e
            }), $cfs.bind(cf_e("currentVisible", conf), function(a, b) {
                a.stopPropagation();
                var c = gi_getCurrentItems($cfs.children(), opts);
                return is_function(b) && b.call($tt0, c), c
            }), $cfs.bind(cf_e("slice", conf), function(a, b, c, d) {
                if (a.stopPropagation(), 0 == itms.total) return !1;
                var e = [b, c, d],
                    f = ["number", "number", "function"],
                    g = cf_sortParams(e, f);
                if (b = is_number(g[0]) ? g[0] : 0, c = is_number(g[1]) ? g[1] : itms.total, d = g[2], b += itms.first, c += itms.first, items.total > 0) {
                    for (; b > itms.total;) b -= itms.total;
                    for (; c > itms.total;) c -= itms.total;
                    for (; 0 > b;) b += itms.total;
                    for (; 0 > c;) c += itms.total
                }
                var i, h = $cfs.children();
                return i = c > b ? h.slice(b, c) : $(h.slice(b, itms.total).get().concat(h.slice(0, c).get())), is_function(d) && d.call($tt0, i), i
            }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(a, b) {
                a.stopPropagation();
                var c = a.type.slice(conf.events.prefix.length),
                    d = crsl[c];
                return is_function(b) && b.call($tt0, d), d
            }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call($tt0, opts);
                else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                else if (!is_undefined(a))
                    if (is_function(b)) {
                        var val = eval("opts." + a);
                        is_undefined(val) && (val = ""), b.call($tt0, val)
                    } else {
                        if (is_undefined(b)) return eval("opts." + a);
                        "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                    }
                if (reInit) {
                    sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                    var sz = sz_setSizes($cfs, opts);
                    $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                }
                return opts
            }), $cfs.bind(cf_e("linkAnchors", conf), function(a, b, c) {
                return a.stopPropagation(), is_undefined(b) ? b = $("body") : is_string(b) && (b = $(b)), is_jquery(b) && 0 != b.length ? (is_string(c) || (c = "a.caroufredsel"), b.find(c).each(function() {
                    var a = this.hash || "";
                    a.length > 0 && -1 != $cfs.children().index($(a)) && $(this).unbind("click").click(function(b) {
                        b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), a)
                    })
                }), !0) : debug(conf, "Not a valid object.")
            }), $cfs.bind(cf_e("updatePageStatus", conf), function(a, b) {
                if (a.stopPropagation(), opts.pagination.container) {
                    var d = opts.pagination.items || opts.items.visible,
                        e = Math.ceil(itms.total / d);
                    b && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                        for (var a = 0; e > a; a++) {
                            var b = $cfs.children().eq(gn_getItemIndex(a * d, 0, !0, itms, $cfs));
                            $(this).append(opts.pagination.anchorBuilder.call(b[0], a + 1))
                        }
                    })), opts.pagination.container.each(function() {
                        $(this).children().unbind(opts.pagination.event).each(function(a) {
                            $(this).bind(opts.pagination.event, function(b) {
                                b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [a * d, -opts.pagination.deviation, !0, opts.pagination])
                            })
                        })
                    }));
                    var f = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                    return f >= e && (f = 0), 0 > f && (f = e - 1), opts.pagination.container.each(function() {
                        $(this).children().removeClass(cf_c("selected", conf)).eq(f).addClass(cf_c("selected", conf))
                    }), !0
                }
            }), $cfs.bind(cf_e("updateSizes", conf), function() {
                var b = opts.items.visible,
                    c = $cfs.children(),
                    d = ms_getParentSize($wrp, opts, "width");
                if (itms.total = c.length, crsl.primarySizePercentage ? (opts.maxDimension = d, opts[opts.d.width] = ms_getPercentage(d, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, d), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, c, d), b = opts.items.visible, sz_setResponsiveSizes(opts, c)) : opts.items.visibleConf.variable ? b = gn_getVisibleItemsNext(c, opts, 0) : "*" != opts.items.filter && (b = gn_getVisibleItemsNextFilter(c, opts, 0)), !opts.circular && 0 != itms.first && b > itms.first) {
                    if (opts.items.visibleConf.variable) var e = gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first;
                    else if ("*" != opts.items.filter) var e = gn_getVisibleItemsPrevFilter(c, opts, itms.first) - itms.first;
                    else var e = opts.items.visible - itms.first;
                    debug(conf, "Preventing non-circular: sliding " + e + " items backward."), $cfs.trigger(cf_e("prev", conf), e)
                }
                opts.items.visible = cf_getItemsAdjust(b, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, c);
                var f = sz_setSizes($cfs, opts);
                return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, f]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), f
            }), $cfs.bind(cf_e("destroy", conf), function(a, b) {
                return a.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), b && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
            }), $cfs.bind(cf_e("debug", conf), function() {
                return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
            }), $cfs.bind("_cfs_triggerEvent", function(a, b, c) {
                return a.stopPropagation(), $cfs.triggerHandler(cf_e(b, conf), c)
            })
        }, FN._unbind_events = function() {
            $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
        }, FN._bind_buttons = function() {
            if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                $wrp.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(a) {
                a.preventDefault();
                var b = !1,
                    c = null;
                crsl.isPaused ? b = "play" : opts.auto.pauseOnEvent && (b = "pause", c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), b && $cfs.trigger(cf_e(b, conf), c)
            }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(a) {
                a.preventDefault(), $cfs.trigger(cf_e("prev", conf))
            }), opts.prev.pauseOnHover)) {
                var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(a) {
                a.preventDefault(), $cfs.trigger(cf_e("next", conf))
            }), opts.next.pauseOnHover)) {
                var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
                var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), a)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(a) {
                var b = a.keyCode;
                b == opts.next.key && (a.preventDefault(), $cfs.trigger(cf_e("next", conf))), b == opts.prev.key && (a.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
            }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(a) {
                var b = a.keyCode;
                b >= 49 && 58 > b && (b = (b - 49) * opts.items.visible, itms.total >= b && (a.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [b, 0, !0, opts.pagination])))
            }), $.fn.swipe) {
                var b = "ontouchstart" in window;
                if (b && opts.swipe.onTouch || !b && opts.swipe.onMouse) {
                    var c = $.extend(!0, {}, opts.prev, opts.swipe),
                        d = $.extend(!0, {}, opts.next, opts.swipe),
                        e = function() {
                            $cfs.trigger(cf_e("prev", conf), [c])
                        }, f = function() {
                            $cfs.trigger(cf_e("next", conf), [d])
                        };
                    switch (opts.direction) {
                        case "up":
                        case "down":
                            opts.swipe.options.swipeUp = f, opts.swipe.options.swipeDown = e;
                            break;
                        default:
                            opts.swipe.options.swipeLeft = f, opts.swipe.options.swipeRight = e
                    }
                    crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
                }
            }
            if ($.fn.mousewheel && opts.mousewheel) {
                var g = $.extend(!0, {}, opts.prev, opts.mousewheel),
                    h = $.extend(!0, {}, opts.next, opts.mousewheel);
                crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(a, b) {
                    a.preventDefault(), b > 0 ? $cfs.trigger(cf_e("prev", conf), [g]) : $cfs.trigger(cf_e("next", conf), [h])
                }), crsl.mousewheel = !0
            }
            if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                var i = function() {
                    $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
                }, j = $(window),
                    k = null;
                if ($.debounce && "debounce" == conf.onWindowResize) k = $.debounce(200, i);
                else if ($.throttle && "throttle" == conf.onWindowResize) k = $.throttle(300, i);
                else {
                    var l = 0,
                        m = 0;
                    k = function() {
                        var a = j.width(),
                            b = j.height();
                        (a != l || b != m) && (i(), l = a, m = b)
                    }
                }
                j.bind(cf_e("resize", conf, !1, !0, !0), k)
            }
        }, FN._unbind_buttons = function() {
            var b = (cf_e("", conf), cf_e("", conf, !1));
            ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(b), opts.auto.button && opts.auto.button.unbind(b), opts.prev.button && opts.prev.button.unbind(b), opts.next.button && opts.next.button.unbind(b), opts.pagination.container && (opts.pagination.container.unbind(b), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
        }, is_boolean(configs) && (configs = {
            debug: configs
        });
        var crsl = {
            direction: "next",
            isPaused: !0,
            isScrolling: !1,
            isStopped: !1,
            mousewheel: !1,
            swipe: !1
        }, itms = {
                total: $cfs.children().length,
                first: 0
            }, tmrs = {
                auto: null,
                progress: null,
                startTime: getTime(),
                timePassed: 0
            }, scrl = {
                isStopped: !1,
                duration: 0,
                startTime: 0,
                easing: "",
                anims: []
            }, clbk = {
                onBefore: [],
                onAfter: []
            }, queu = [],
            conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
            opts = {}, opts_orig = $.extend(!0, {}, options),
            $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
        else {
            var start_arr = [];
            0 != opts.items.start && start_arr.push(opts.items.start)
        } if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
            for (var a = 0, l = start_arr.length; l > a; a++) {
                var s = start_arr[a];
                if (0 != s) {
                    if (s === !0) {
                        if (s = window.location.hash, 1 > s.length) continue
                    } else "random" === s && (s = Math.floor(Math.random() * itms.total)); if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                        fx: "none"
                    }])) break
                }
            }
        var siz = sz_setSizes($cfs, opts),
            itm = gi_getCurrentItems($cfs.children(), opts);
        return opts.onCreate && opts.onCreate.call($tt0, {
            width: siz.width,
            height: siz.height,
            items: itm
        }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
    }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
        synchronise: !1,
        infinite: !0,
        circular: !0,
        responsive: !1,
        direction: "left",
        items: {
            start: 0
        },
        scroll: {
            easing: "swing",
            duration: 500,
            pauseOnHover: !1,
            event: "click",
            queue: !1
        }
    }, $.fn.carouFredSel.configs = {
        debug: !1,
        transition: !1,
        onWindowResize: "throttle",
        events: {
            prefix: "",
            namespace: "cfs"
        },
        wrapper: {
            element: "div",
            classname: "caroufredsel_wrapper"
        },
        classnames: {}
    }, $.fn.carouFredSel.pageAnchorBuilder = function(a) {
        return '<a href="#"><span>' + a + "</span></a>"
    }, $.fn.carouFredSel.progressbarUpdater = function(a) {
        $(this).css("width", a + "%")
    }, $.fn.carouFredSel.cookie = {
        get: function(a) {
            a += "=";
            for (var b = document.cookie.split(";"), c = 0, d = b.length; d > c; c++) {
                for (var e = b[c];
                    " " == e.charAt(0);) e = e.slice(1);
                if (0 == e.indexOf(a)) return e.slice(a.length)
            }
            return 0
        },
        set: function(a, b, c) {
            var d = "";
            if (c) {
                var e = new Date;
                e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), d = "; expires=" + e.toGMTString()
            }
            document.cookie = a + "=" + b + d + "; path=/"
        },
        remove: function(a) {
            $.fn.carouFredSel.cookie.set(a, "", -1)
        }
    }, $.extend($.easing, {
        quadratic: function(a) {
            var b = a * a;
            return a * (-b * a + 4 * b - 6 * a + 4)
        },
        cubic: function(a) {
            return a * (4 * a * a - 9 * a + 6)
        },
        elastic: function(a) {
            var b = a * a;
            return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15)
        }
    }))
})(jQuery);

/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2013 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.5.0
 * Date: 7th November 2013
 */

(function(b, f) {
    "function" === typeof define && define.amd ? define(["jquery"], f) : b.jQuery ? f(b.jQuery) : f(b.Zepto)
})(this, function(b, f) {
    b.fn.jPlayer = function(a) {
        var c = "string" === typeof a,
            d = Array.prototype.slice.call(arguments, 1),
            e = this;
        a = !c && d.length ? b.extend.apply(null, [!0, a].concat(d)) : a;
        if (c && "_" === a.charAt(0)) return e;
        c ? this.each(function() {
            var c = b(this).data("jPlayer"),
                h = c && b.isFunction(c[a]) ? c[a].apply(c, d) : c;
            if (h !== c && h !== f) return e = h, !1
        }) : this.each(function() {
            var c = b(this).data("jPlayer");
            c ? c.option(a || {}) : b(this).data("jPlayer", new b.jPlayer(a, this))
        });
        return e
    };
    b.jPlayer = function(a, c) {
        if (arguments.length) {
            this.element = b(c);
            this.options = b.extend(!0, {}, this.options, a);
            var d = this;
            this.element.bind("remove.jPlayer", function() {
                d.destroy()
            });
            this._init()
        }
    };
    "function" !== typeof b.fn.stop && (b.fn.stop = function() {});
    b.jPlayer.emulateMethods = "load play pause";
    b.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
    b.jPlayer.emulateOptions = "muted volume";
    b.jPlayer.reservedEvent =
        "ready flashreset resize repeat error warning";
    b.jPlayer.event = {};
    b.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "), function() {
        b.jPlayer.event[this] = "jPlayer_" + this
    });
    b.jPlayer.htmlEvent = "loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough".split(" ");
    b.jPlayer.pause =
        function() {
            b.each(b.jPlayer.prototype.instances, function(a, c) {
                c.data("jPlayer").status.srcSet && c.jPlayer("pause")
            })
    };
    b.jPlayer.timeFormat = {
        showHour: !1,
        showMin: !0,
        showSec: !0,
        padHour: !1,
        padMin: !0,
        padSec: !0,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    var m = function() {
        this.init()
    };
    m.prototype = {
        init: function() {
            this.options = {
                timeFormat: b.jPlayer.timeFormat
            }
        },
        time: function(a) {
            var c = new Date(1E3 * (a && "number" === typeof a ? a : 0)),
                b = c.getUTCHours();
            a = this.options.timeFormat.showHour ? c.getUTCMinutes() : c.getUTCMinutes() + 60 *
                b;
            c = this.options.timeFormat.showMin ? c.getUTCSeconds() : c.getUTCSeconds() + 60 * a;
            b = this.options.timeFormat.padHour && 10 > b ? "0" + b : b;
            a = this.options.timeFormat.padMin && 10 > a ? "0" + a : a;
            c = this.options.timeFormat.padSec && 10 > c ? "0" + c : c;
            b = "" + (this.options.timeFormat.showHour ? b + this.options.timeFormat.sepHour : "");
            b += this.options.timeFormat.showMin ? a + this.options.timeFormat.sepMin : "";
            return b += this.options.timeFormat.showSec ? c + this.options.timeFormat.sepSec : ""
        }
    };
    var n = new m;
    b.jPlayer.convertTime = function(a) {
        return n.time(a)
    };
    b.jPlayer.uaBrowser = function(a) {
        a = a.toLowerCase();
        var c = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            b = /(msie) ([\w.]+)/,
            e = /(mozilla)(?:.*? rv:([\w.]+))?/;
        a = /(webkit)[ \/]([\w.]+)/.exec(a) || c.exec(a) || b.exec(a) || 0 > a.indexOf("compatible") && e.exec(a) || [];
        return {
            browser: a[1] || "",
            version: a[2] || "0"
        }
    };
    b.jPlayer.uaPlatform = function(a) {
        var c = a.toLowerCase(),
            b = /(android)/,
            e = /(mobile)/;
        a = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(c) || [];
        c = /(ipad|playbook)/.exec(c) || !e.exec(c) && b.exec(c) ||
            [];
        a[1] && (a[1] = a[1].replace(/\s/g, "_"));
        return {
            platform: a[1] || "",
            tablet: c[1] || ""
        }
    };
    b.jPlayer.browser = {};
    b.jPlayer.platform = {};
    var k = b.jPlayer.uaBrowser(navigator.userAgent);
    k.browser && (b.jPlayer.browser[k.browser] = !0, b.jPlayer.browser.version = k.version);
    k = b.jPlayer.uaPlatform(navigator.userAgent);
    k.platform && (b.jPlayer.platform[k.platform] = !0, b.jPlayer.platform.mobile = !k.tablet, b.jPlayer.platform.tablet = !! k.tablet);
    b.jPlayer.getDocMode = function() {
        var a;
        b.jPlayer.browser.msie && (document.documentMode ?
            a = document.documentMode : (a = 5, document.compatMode && "CSS1Compat" === document.compatMode && (a = 7)));
        return a
    };
    b.jPlayer.browser.documentMode = b.jPlayer.getDocMode();
    b.jPlayer.nativeFeatures = {
        init: function() {
            var a = document,
                c = a.createElement("video"),
                b = {
                    w3c: "fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "),
                    moz: "mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "),
                    webkit: " webkitCurrentFullScreenElement webkitRequestFullScreen webkitCancelFullScreen webkitfullscreenchange ".split(" "),
                    webkitVideo: "webkitSupportsFullscreen webkitDisplayingFullscreen webkitEnterFullscreen webkitExitFullscreen  ".split(" ")
                }, e = ["w3c", "moz", "webkit", "webkitVideo"],
                g, h;
            this.fullscreen = c = {
                support: {
                    w3c: !! a[b.w3c[0]],
                    moz: !! a[b.moz[0]],
                    webkit: "function" === typeof a[b.webkit[3]],
                    webkitVideo: "function" === typeof c[b.webkitVideo[2]]
                },
                used: {}
            };
            g = 0;
            for (h = e.length; g < h; g++) {
                var f = e[g];
                if (c.support[f]) {
                    c.spec =
                        f;
                    c.used[f] = !0;
                    break
                }
            }
            if (c.spec) {
                var l = b[c.spec];
                c.api = {
                    fullscreenEnabled: !0,
                    fullscreenElement: function(c) {
                        c = c ? c : a;
                        return c[l[1]]
                    },
                    requestFullscreen: function(a) {
                        return a[l[2]]()
                    },
                    exitFullscreen: function(c) {
                        c = c ? c : a;
                        return c[l[3]]()
                    }
                };
                c.event = {
                    fullscreenchange: l[4],
                    fullscreenerror: l[5]
                }
            } else c.api = {
                fullscreenEnabled: !1,
                fullscreenElement: function() {
                    return null
                },
                requestFullscreen: function() {},
                exitFullscreen: function() {}
            }, c.event = {}
        }
    };
    b.jPlayer.nativeFeatures.init();
    b.jPlayer.focus = null;
    b.jPlayer.keyIgnoreElementNames =
        "INPUT TEXTAREA";
    var p = function(a) {
        var c = b.jPlayer.focus,
            d;
        c && (b.each(b.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(c, b) {
            if (a.target.nodeName.toUpperCase() === b.toUpperCase()) return d = !0, !1
        }), d || b.each(c.options.keyBindings, function(d, g) {
            if (g && a.which === g.key && b.isFunction(g.fn)) return a.preventDefault(), g.fn(c), !1
        }))
    };
    b.jPlayer.keys = function(a) {
        b(document.documentElement).unbind("keydown.jPlayer");
        a && b(document.documentElement).bind("keydown.jPlayer", p)
    };
    b.jPlayer.keys(!0);
    b.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.5.0",
            needFlash: "2.5.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            preload: "metadata",
            volume: 0.8,
            muted: !1,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            minPlaybackRate: 0.5,
            maxPlaybackRate: 4,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                playbackRateBar: ".jp-playback-rate-bar",
                playbackRateBarValue: ".jp-playback-rate-bar-value",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            smoothPlayBar: !1,
            fullScreen: !1,
            fullWindow: !1,
            autohide: {
                restored: !1,
                full: !0,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1E3
            },
            loop: !1,
            repeat: function(a) {
                a.jPlayer.options.loop ?
                    b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                        b(this).jPlayer("play")
                    }) : b(this).unbind(".jPlayerRepeat")
            },
            nativeVideoControls: {},
            noFullWindow: {
                msie: /msie [0-6]\./,
                ipad: /ipad.*?os [0-4]\./,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3]\.(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/,
                playbook: /playbook/
            },
            timeFormat: {},
            keyEnabled: !1,
            audioFullScreen: !1,
            keyBindings: {
                play: {
                    key: 32,
                    fn: function(a) {
                        a.status.paused ? a.play() : a.pause()
                    }
                },
                fullScreen: {
                    key: 13,
                    fn: function(a) {
                        (a.status.video || a.options.audioFullScreen) && a._setOption("fullScreen", !a.options.fullScreen)
                    }
                },
                muted: {
                    key: 8,
                    fn: function(a) {
                        a._muted(!a.options.muted)
                    }
                },
                volumeUp: {
                    key: 38,
                    fn: function(a) {
                        a.volume(a.options.volume +
                            0.1)
                    }
                },
                volumeDown: {
                    key: 40,
                    fn: function(a) {
                        a.volume(a.options.volume - 0.1)
                    }
                }
            },
            verticalVolume: !1,
            verticalPlaybackRate: !1,
            globalVolume: !1,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: !1,
            consoleAlerts: !0,
            errorAlerts: !1,
            warningAlerts: !1
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: !0,
            format: {},
            formatType: "",
            waitForPlay: !0,
            waitForLoad: !0,
            srcSet: !1,
            video: !1,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            videoWidth: 0,
            videoHeight: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: !1
        },
        solution: {
            html: !0,
            flash: !0
        },
        format: {
            mp3: {
                codec: 'audio/mpeg; codecs="mp3"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: !0,
                media: "audio"
            },
            m3u8a: {
                codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
                flashCanPlay: !1,
                media: "audio"
            },
            m3ua: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis, opus"',
                flashCanPlay: !1,
                media: "audio"
            },
            flac: {
                codec: "audio/x-flac",
                flashCanPlay: !1,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: !1,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: !0,
                media: "audio"
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !0,
                media: "video"
            },
            m3u8v: {
                codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !1,
                media: "video"
            },
            m3uv: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: !1,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: !1,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: !0,
                media: "video"
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "video"
            }
        },
        _init: function() {
            var a =
                this;
            this.element.empty();
            this.status = b.extend({}, this.status);
            this.internal = b.extend({}, this.internal);
            this.options.timeFormat = b.extend({}, b.jPlayer.timeFormat, this.options.timeFormat);
            this.internal.cmdsIgnored = b.jPlayer.platform.ipad || b.jPlayer.platform.iphone || b.jPlayer.platform.ipod;
            this.internal.domNode = this.element.get(0);
            this.options.keyEnabled && !b.jPlayer.focus && (b.jPlayer.focus = this);
            this.formats = [];
            this.solutions = [];
            this.require = {};
            this.htmlElement = {};
            this.html = {};
            this.html.audio = {};
            this.html.video = {};
            this.flash = {};
            this.css = {};
            this.css.cs = {};
            this.css.jq = {};
            this.ancestorJq = [];
            this.options.volume = this._limitValue(this.options.volume, 0, 1);
            b.each(this.options.supplied.toLowerCase().split(","), function(c, d) {
                var e = d.replace(/^\s+|\s+$/g, "");
                if (a.format[e]) {
                    var f = !1;
                    b.each(a.formats, function(a, c) {
                        if (e === c) return f = !0, !1
                    });
                    f || a.formats.push(e)
                }
            });
            b.each(this.options.solution.toLowerCase().split(","), function(c, d) {
                var e = d.replace(/^\s+|\s+$/g, "");
                if (a.solution[e]) {
                    var f = !1;
                    b.each(a.solutions, function(a,
                        c) {
                        if (e === c) return f = !0, !1
                    });
                    f || a.solutions.push(e)
                }
            });
            this.internal.instance = "jp_" + this.count;
            this.instances[this.internal.instance] = this.element;
            this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
            this.internal.self = b.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            });
            this.internal.audio = b.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: f
            });
            this.internal.video = b.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: f
            });
            this.internal.flash =
                b.extend({}, {
                    id: this.options.idPrefix + "_flash_" + this.count,
                    jq: f,
                    swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "Jplayer.swf" : "")
                });
            this.internal.poster = b.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: f
            });
            b.each(b.jPlayer.event, function(c, b) {
                a.options[c] !== f && (a.element.bind(b + ".jPlayer", a.options[c]), a.options[c] = f)
            });
            this.require.audio = !1;
            this.require.video = !1;
            b.each(this.formats, function(c,
                b) {
                a.require[a.format[b].media] = !0
            });
            this.options = this.require.video ? b.extend(!0, {}, this.optionsVideo, this.options) : b.extend(!0, {}, this.optionsAudio, this.options);
            this._setSize();
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
            this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
            this.status.noVolume = this._uaBlocklist(this.options.noVolume);
            b.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners();
            this._restrictNativeVideoControls();
            this.htmlElement.poster = document.createElement("img");
            this.htmlElement.poster.id = this.internal.poster.id;
            this.htmlElement.poster.onload = function() {
                a.status.video && !a.status.waitForPlay || a.internal.poster.jq.show()
            };
            this.element.append(this.htmlElement.poster);
            this.internal.poster.jq = b("#" + this.internal.poster.id);
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            this.internal.poster.jq.hide();
            this.internal.poster.jq.bind("click.jPlayer", function() {
                a._trigger(b.jPlayer.event.click)
            });
            this.html.audio.available = !1;
            this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !! this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio));
            this.html.video.available = !1;
            this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !! this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video));
            this.flash.available = this._checkForFlash(10.1);
            this.html.canPlay = {};
            this.flash.canPlay = {};
            b.each(this.formats, function(c, b) {
                a.html.canPlay[b] = a.html[a.format[b].media].available && "" !== a.htmlElement[a.format[b].media].canPlayType(a.format[b].codec);
                a.flash.canPlay[b] = a.format[b].flashCanPlay && a.flash.available
            });
            this.html.desired = !1;
            this.flash.desired = !1;
            b.each(this.solutions, function(c, d) {
                if (0 === c) a[d].desired = !0;
                else {
                    var e = !1,
                        f = !1;
                    b.each(a.formats, function(c, b) {
                        a[a.solutions[0]].canPlay[b] && ("video" ===
                            a.format[b].media ? f = !0 : e = !0)
                    });
                    a[d].desired = a.require.audio && !e || a.require.video && !f
                }
            });
            this.html.support = {};
            this.flash.support = {};
            b.each(this.formats, function(c, b) {
                a.html.support[b] = a.html.canPlay[b] && a.html.desired;
                a.flash.support[b] = a.flash.canPlay[b] && a.flash.desired
            });
            this.html.used = !1;
            this.flash.used = !1;
            b.each(this.solutions, function(c, d) {
                b.each(a.formats, function(c, b) {
                    if (a[d].support[b]) return a[d].used = !0, !1
                })
            });
            this._resetActive();
            this._resetGate();
            this._cssSelectorAncestor(this.options.cssSelectorAncestor);
            this.html.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
                type: b.jPlayer.error.NO_SOLUTION,
                context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                message: b.jPlayer.errorMsg.NO_SOLUTION,
                hint: b.jPlayer.errorHint.NO_SOLUTION
            }), this.css.jq.noSolution.length && this.css.jq.noSolution.show());
            if (this.flash.used) {
                var c, d = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume +
                        "&muted=" + this.options.muted;
                if (b.jPlayer.browser.msie && (9 > Number(b.jPlayer.browser.version) || 9 > b.jPlayer.browser.documentMode)) {
                    d = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + d + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    c = document.createElement('<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
                    for (var e = 0; e < d.length; e++) c.appendChild(document.createElement(d[e]))
                } else e = function(a, c, b) {
                    var d = document.createElement("param");
                    d.setAttribute("name", c);
                    d.setAttribute("value", b);
                    a.appendChild(d)
                }, c = document.createElement("object"), c.setAttribute("id", this.internal.flash.id), c.setAttribute("name", this.internal.flash.id), c.setAttribute("data", this.internal.flash.swf), c.setAttribute("type", "application/x-shockwave-flash"), c.setAttribute("width", "1"), c.setAttribute("height", "1"), c.setAttribute("tabindex",
                    "-1"), e(c, "flashvars", d), e(c, "allowscriptaccess", "always"), e(c, "bgcolor", this.options.backgroundColor), e(c, "wmode", this.options.wmode);
                this.element.append(c);
                this.internal.flash.jq = b(c)
            }
            this.status.playbackRateEnabled = this.html.used && !this.flash.used ? this._testPlaybackRate("audio") : !1;
            this._updatePlaybackRate();
            this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = b("#" + this.internal.audio.id)),
                this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = b("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                }) : this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.internal.video.jq.bind("click.jPlayer", function() {
                    a._trigger(b.jPlayer.event.click)
                })));
            this.options.emulateHtml && this._emulateHtmlBridge();
            this.html.used && !this.flash.used && setTimeout(function() {
                a.internal.ready = !0;
                a.version.flash = "n/a";
                a._trigger(b.jPlayer.event.repeat);
                a._trigger(b.jPlayer.event.ready)
            }, 100);
            this._updateNativeVideoControls();
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide();
            b.jPlayer.prototype.count++
        },
        destroy: function() {
            this.clearMedia();
            this._removeUiClass();
            this.css.jq.currentTime.length && this.css.jq.currentTime.text("");
            this.css.jq.duration.length && this.css.jq.duration.text("");
            b.each(this.css.jq, function(a,
                c) {
                c.length && c.unbind(".jPlayer")
            });
            this.internal.poster.jq.unbind(".jPlayer");
            this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer");
            this._fullscreenRemoveEventListeners();
            this === b.jPlayer.focus && (b.jPlayer.focus = null);
            this.options.emulateHtml && this._destroyHtmlBridge();
            this.element.removeData("jPlayer");
            this.element.unbind(".jPlayer");
            this.element.empty();
            delete this.instances[this.internal.instance]
        },
        enable: function() {},
        disable: function() {},
        _testCanPlayType: function(a) {
            try {
                return a.canPlayType(this.format.mp3.codec), !0
            } catch (c) {
                return !1
            }
        },
        _testPlaybackRate: function(a) {
            a = document.createElement("string" === typeof a ? a : "audio");
            try {
                return "playbackRate" in a ? (a.playbackRate = 0.5, 0.5 === a.playbackRate) : !1
            } catch (c) {
                return !1
            }
        },
        _uaBlocklist: function(a) {
            var c = navigator.userAgent.toLowerCase(),
                d = !1;
            b.each(a, function(a, b) {
                if (b && b.test(c)) return d = !0, !1
            });
            return d
        },
        _restrictNativeVideoControls: function() {
            this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullWindow = !0)
        },
        _updateNativeVideoControls: function() {
            this.html.video.available &&
                this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                })))
        },
        _addHtmlEventListeners: function(a, c) {
            var d = this;
            a.preload = this.options.preload;
            a.muted = this.options.muted;
            a.volume = this.options.volume;
            this.status.playbackRateEnabled && (a.defaultPlaybackRate = this.options.defaultPlaybackRate, a.playbackRate = this.options.playbackRate);
            a.addEventListener("progress", function() {
                c.gate && (d.internal.cmdsIgnored && 0 < this.readyState && (d.internal.cmdsIgnored = !1), d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.progress))
            }, !1);
            a.addEventListener("timeupdate", function() {
                c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.timeupdate))
            }, !1);
            a.addEventListener("durationchange", function() {
                c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.durationchange))
            }, !1);
            a.addEventListener("play", function() {
                c.gate && (d._updateButtons(!0), d._html_checkWaitForPlay(), d._trigger(b.jPlayer.event.play))
            }, !1);
            a.addEventListener("playing", function() {
                c.gate && (d._updateButtons(!0), d._seeked(), d._trigger(b.jPlayer.event.playing))
            }, !1);
            a.addEventListener("pause", function() {
                c.gate && (d._updateButtons(!1), d._trigger(b.jPlayer.event.pause))
            }, !1);
            a.addEventListener("waiting", function() {
                c.gate && (d._seeking(), d._trigger(b.jPlayer.event.waiting))
            }, !1);
            a.addEventListener("seeking", function() {
                c.gate && (d._seeking(), d._trigger(b.jPlayer.event.seeking))
            }, !1);
            a.addEventListener("seeked", function() {
                c.gate && (d._seeked(), d._trigger(b.jPlayer.event.seeked))
            }, !1);
            a.addEventListener("volumechange", function() {
                c.gate && (d.options.volume = a.volume, d.options.muted = a.muted, d._updateMute(), d._updateVolume(), d._trigger(b.jPlayer.event.volumechange))
            }, !1);
            a.addEventListener("ratechange",
                function() {
                    c.gate && (d.options.defaultPlaybackRate = a.defaultPlaybackRate, d.options.playbackRate = a.playbackRate, d._updatePlaybackRate(), d._trigger(b.jPlayer.event.ratechange))
                }, !1);
            a.addEventListener("suspend", function() {
                c.gate && (d._seeked(), d._trigger(b.jPlayer.event.suspend))
            }, !1);
            a.addEventListener("ended", function() {
                c.gate && (b.jPlayer.browser.webkit || (d.htmlElement.media.currentTime = 0), d.htmlElement.media.pause(), d._updateButtons(!1), d._getHtmlStatus(a, !0), d._updateInterface(), d._trigger(b.jPlayer.event.ended))
            }, !1);
            a.addEventListener("error", function() {
                c.gate && (d._updateButtons(!1), d._seeked(), d.status.srcSet && (clearTimeout(d.internal.htmlDlyCmdId), d.status.waitForLoad = !0, d.status.waitForPlay = !0, d.status.video && !d.status.nativeVideoControls && d.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), d._validString(d.status.media.poster) && !d.status.nativeVideoControls && d.internal.poster.jq.show(), d.css.jq.videoPlay.length && d.css.jq.videoPlay.show(), d._error({
                    type: b.jPlayer.error.URL,
                    context: d.status.src,
                    message: b.jPlayer.errorMsg.URL,
                    hint: b.jPlayer.errorHint.URL
                })))
            }, !1);
            b.each(b.jPlayer.htmlEvent, function(e, g) {
                a.addEventListener(this, function() {
                    c.gate && d._trigger(b.jPlayer.event[g])
                }, !1)
            })
        },
        _getHtmlStatus: function(a, c) {
            var b = 0,
                e = 0,
                g = 0,
                f = 0;
            isFinite(a.duration) && (this.status.duration = a.duration);
            b = a.currentTime;
            e = 0 < this.status.duration ? 100 * b / this.status.duration : 0;
            "object" === typeof a.seekable && 0 < a.seekable.length ? (g = 0 < this.status.duration ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100, f = 0 < this.status.duration ?
                100 * a.currentTime / a.seekable.end(a.seekable.length - 1) : 0) : (g = 100, f = e);
            c && (e = f = b = 0);
            this.status.seekPercent = g;
            this.status.currentPercentRelative = f;
            this.status.currentPercentAbsolute = e;
            this.status.currentTime = b;
            this.status.videoWidth = a.videoWidth;
            this.status.videoHeight = a.videoHeight;
            this.status.readyState = a.readyState;
            this.status.networkState = a.networkState;
            this.status.playbackRate = a.playbackRate;
            this.status.ended = a.ended
        },
        _resetStatus: function() {
            this.status = b.extend({}, this.status, b.jPlayer.prototype.status)
        },
        _trigger: function(a, c, d) {
            a = b.Event(a);
            a.jPlayer = {};
            a.jPlayer.version = b.extend({}, this.version);
            a.jPlayer.options = b.extend(!0, {}, this.options);
            a.jPlayer.status = b.extend(!0, {}, this.status);
            a.jPlayer.html = b.extend(!0, {}, this.html);
            a.jPlayer.flash = b.extend(!0, {}, this.flash);
            c && (a.jPlayer.error = b.extend({}, c));
            d && (a.jPlayer.warning = b.extend({}, d));
            this.element.trigger(a)
        },
        jPlayerFlashEvent: function(a, c) {
            if (a === b.jPlayer.event.ready)
                if (!this.internal.ready) this.internal.ready = !0, this.internal.flash.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.version.flash = c.version, this.version.needFlash !== this.version.flash && this._error({
                    type: b.jPlayer.error.VERSION,
                    context: this.version.flash,
                    message: b.jPlayer.errorMsg.VERSION + this.version.flash,
                    hint: b.jPlayer.errorHint.VERSION
                }), this._trigger(b.jPlayer.event.repeat), this._trigger(a);
                else
            if (this.flash.gate) {
                if (this.status.srcSet) {
                    var d = this.status.currentTime,
                        e = this.status.paused;
                    this.setMedia(this.status.media);
                    this.volumeWorker(this.options.volume);
                    0 < d && (e ? this.pause(d) : this.play(d))
                }
                this._trigger(b.jPlayer.event.flashreset)
            }
            if (this.flash.gate) switch (a) {
                case b.jPlayer.event.progress:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.timeupdate:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.play:
                    this._seeked();
                    this._updateButtons(!0);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.pause:
                    this._updateButtons(!1);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.ended:
                    this._updateButtons(!1);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.click:
                    this._trigger(a);
                    break;
                case b.jPlayer.event.error:
                    this.status.waitForLoad = !0;
                    this.status.waitForPlay = !0;
                    this.status.video && this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    });
                    this._validString(this.status.media.poster) && this.internal.poster.jq.show();
                    this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show();
                    this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media);
                    this._updateButtons(!1);
                    this._error({
                        type: b.jPlayer.error.URL,
                        context: c.src,
                        message: b.jPlayer.errorMsg.URL,
                        hint: b.jPlayer.errorHint.URL
                    });
                    break;
                case b.jPlayer.event.seeking:
                    this._seeking();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.seeked:
                    this._seeked();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(a)
            }
            return !1
        },
        _getFlashStatus: function(a) {
            this.status.seekPercent = a.seekPercent;
            this.status.currentPercentRelative = a.currentPercentRelative;
            this.status.currentPercentAbsolute = a.currentPercentAbsolute;
            this.status.currentTime = a.currentTime;
            this.status.duration = a.duration;
            this.status.videoWidth = a.videoWidth;
            this.status.videoHeight = a.videoHeight;
            this.status.readyState =
                4;
            this.status.networkState = 0;
            this.status.playbackRate = 1;
            this.status.ended = !1
        },
        _updateButtons: function(a) {
            a === f ? a = !this.status.paused : this.status.paused = !a;
            this.css.jq.play.length && this.css.jq.pause.length && (a ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide()));
            this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(),
                this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide()));
            this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
        },
        _updateInterface: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%");
            this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
                width: this.status.currentPercentAbsolute +
                    "%"
            }, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
            this.css.jq.currentTime.length && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
            this.css.jq.duration.length && this.css.jq.duration.text(this._convertTime(this.status.duration))
        },
        _convertTime: m.prototype.time,
        _seeking: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
        },
        _seeked: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
        },
        _resetGate: function() {
            this.html.audio.gate = !1;
            this.html.video.gate = !1;
            this.flash.gate = !1
        },
        _resetActive: function() {
            this.html.active = !1;
            this.flash.active = !1
        },
        _escapeHtml: function(a) {
            return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")
        },
        _qualifyURL: function(a) {
            var c = document.createElement("div");
            c.innerHTML = '<a href="' + this._escapeHtml(a) + '">x</a>';
            return c.firstChild.href
        },
        _absoluteMediaUrls: function(a) {
            var c = this;
            b.each(a, function(b, e) {
                c.format[b] &&
                    (a[b] = c._qualifyURL(e))
            });
            return a
        },
        setMedia: function(a) {
            var c = this,
                d = !1,
                e = this.status.media.poster !== a.poster;
            this._resetMedia();
            this._resetGate();
            this._resetActive();
            a = this._absoluteMediaUrls(a);
            b.each(this.formats, function(e, f) {
                var k = "video" === c.format[f].media;
                b.each(c.solutions, function(b, e) {
                    if (c[e].support[f] && c._validString(a[f])) {
                        var g = "html" === e;
                        k ? (g ? (c.html.video.gate = !0, c._html_setVideo(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setVideo(a), c.flash.active = !0), c.css.jq.videoPlay.length &&
                            c.css.jq.videoPlay.show(), c.status.video = !0) : (g ? (c.html.audio.gate = !0, c._html_setAudio(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setAudio(a), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.hide(), c.status.video = !1);
                        d = !0;
                        return !1
                    }
                });
                if (d) return !1
            });
            d ? (this.status.nativeVideoControls && this.html.video.gate || !this._validString(a.poster) || (e ? this.htmlElement.poster.src = a.poster : this.internal.poster.jq.show()), this.status.srcSet = !0, this.status.media = b.extend({}, a), this._updateButtons(!1),
                this._updateInterface()) : this._error({
                type: b.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: b.jPlayer.errorMsg.NO_SUPPORT,
                hint: b.jPlayer.errorHint.NO_SUPPORT
            })
        },
        _resetMedia: function() {
            this._resetStatus();
            this._updateButtons(!1);
            this._updateInterface();
            this._seeked();
            this.internal.poster.jq.hide();
            clearTimeout(this.internal.htmlDlyCmdId);
            this.html.active ? this._html_resetMedia() : this.flash.active && this._flash_resetMedia()
        },
        clearMedia: function() {
            this._resetMedia();
            this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia();
            this._resetGate();
            this._resetActive()
        },
        load: function() {
            this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
        },
        focus: function() {
            this.options.keyEnabled && (b.jPlayer.focus = this)
        },
        play: function(a) {
            a = "number" === typeof a ? a : NaN;
            this.status.srcSet ? (this.focus(), this.html.active ? this._html_play(a) : this.flash.active && this._flash_play(a)) : this._urlNotSetError("play")
        },
        videoPlay: function() {
            this.play()
        },
        pause: function(a) {
            a = "number" === typeof a ? a : NaN;
            this.status.srcSet ? this.html.active ? this._html_pause(a) : this.flash.active && this._flash_pause(a) : this._urlNotSetError("pause")
        },
        tellOthers: function(a, c) {
            var d = this,
                e = "function" === typeof c,
                g = Array.prototype.slice.call(arguments);
            "string" === typeof a && (e && g.splice(1, 1), b.each(this.instances, function() {
                d.element !== this && (e && !c.call(this.data("jPlayer"), d) || this.jPlayer.apply(this, g))
            }))
        },
        pauseOthers: function(a) {
            this.tellOthers("pause",
                function() {
                    return this.status.srcSet
                }, a)
        },
        stop: function() {
            this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
        },
        playHead: function(a) {
            a = this._limitValue(a, 0, 100);
            this.status.srcSet ? this.html.active ? this._html_playHead(a) : this.flash.active && this._flash_playHead(a) : this._urlNotSetError("playHead")
        },
        _muted: function(a) {
            this.mutedWorker(a);
            this.options.globalVolume && this.tellOthers("mutedWorker", function() {
                    return this.options.globalVolume
                },
                a)
        },
        mutedWorker: function(a) {
            this.options.muted = a;
            this.html.used && this._html_setProperty("muted", a);
            this.flash.used && this._flash_mute(a);
            this.html.video.gate || this.html.audio.gate || (this._updateMute(a), this._updateVolume(this.options.volume), this._trigger(b.jPlayer.event.volumechange))
        },
        mute: function(a) {
            a = a === f ? !0 : !! a;
            this._muted(a)
        },
        unmute: function(a) {
            a = a === f ? !0 : !! a;
            this._muted(!a)
        },
        _updateMute: function(a) {
            a === f && (a = this.options.muted);
            this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ?
                (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : a ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
        },
        volume: function(a) {
            this.volumeWorker(a);
            this.options.globalVolume && this.tellOthers("volumeWorker", function() {
                return this.options.globalVolume
            }, a)
        },
        volumeWorker: function(a) {
            a = this._limitValue(a, 0, 1);
            this.options.volume = a;
            this.html.used && this._html_setProperty("volume", a);
            this.flash.used && this._flash_volume(a);
            this.html.video.gate || this.html.audio.gate ||
                (this._updateVolume(a), this._trigger(b.jPlayer.event.volumechange))
        },
        volumeBar: function(a) {
            if (this.css.jq.volumeBar.length) {
                var c = b(a.currentTarget),
                    d = c.offset(),
                    e = a.pageX - d.left,
                    g = c.width();
                a = c.height() - a.pageY + d.top;
                c = c.height();
                this.options.verticalVolume ? this.volume(a / c) : this.volume(e / g)
            }
            this.options.muted && this._muted(!1)
        },
        volumeBarValue: function() {},
        _updateVolume: function(a) {
            a === f && (a = this.options.volume);
            a = this.options.muted ? 0 : a;
            this.status.noVolume ? (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(),
                this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * a + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
        },
        volumeMax: function() {
            this.volume(1);
            this.options.muted && this._muted(!1)
        },
        _cssSelectorAncestor: function(a) {
            var c =
                this;
            this.options.cssSelectorAncestor = a;
            this._removeUiClass();
            this.ancestorJq = a ? b(a) : [];
            a && 1 !== this.ancestorJq.length && this._warning({
                type: b.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: a,
                message: b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: b.jPlayer.warningHint.CSS_SELECTOR_COUNT
            });
            this._addUiClass();
            b.each(this.options.cssSelector, function(a, b) {
                c._cssSelector(a, b)
            });
            this._updateInterface();
            this._updateButtons();
            this._updateAutohide();
            this._updateVolume();
            this._updateMute()
        },
        _cssSelector: function(a, c) {
            var d = this;
            "string" === typeof c ? b.jPlayer.prototype.options.cssSelector[a] ? (this.css.jq[a] && this.css.jq[a].length && this.css.jq[a].unbind(".jPlayer"), this.options.cssSelector[a] = c, this.css.cs[a] = this.options.cssSelectorAncestor + " " + c, this.css.jq[a] = c ? b(this.css.cs[a]) : [], this.css.jq[a].length && this.css.jq[a].bind("click.jPlayer", function(c) {
                c.preventDefault();
                d[a](c);
                b(this).blur()
            }), c && 1 !== this.css.jq[a].length && this._warning({
                type: b.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: this.css.cs[a],
                message: b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[a].length + " found for " + a + " method.",
                hint: b.jPlayer.warningHint.CSS_SELECTOR_COUNT
            })) : this._warning({
                type: b.jPlayer.warning.CSS_SELECTOR_METHOD,
                context: a,
                message: b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                hint: b.jPlayer.warningHint.CSS_SELECTOR_METHOD
            }) : this._warning({
                type: b.jPlayer.warning.CSS_SELECTOR_STRING,
                context: c,
                message: b.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                hint: b.jPlayer.warningHint.CSS_SELECTOR_STRING
            })
        },
        seekBar: function(a) {
            if (this.css.jq.seekBar.length) {
                var c = b(a.currentTarget),
                    d = c.offset();
                a = a.pageX - d.left;
                c = c.width();
                this.playHead(100 * a / c)
            }
        },
        playBar: function() {},
        playbackRate: function(a) {
            this._setOption("playbackRate", a)
        },
        playbackRateBar: function(a) {
            if (this.css.jq.playbackRateBar.length) {
                var c = b(a.currentTarget),
                    d = c.offset(),
                    e = a.pageX - d.left,
                    g = c.width();
                a = c.height() - a.pageY + d.top;
                c = c.height();
                this.playbackRate((this.options.verticalPlaybackRate ? a / c : e / g) * (this.options.maxPlaybackRate - this.options.minPlaybackRate) +
                    this.options.minPlaybackRate)
            }
        },
        playbackRateBarValue: function() {},
        _updatePlaybackRate: function() {
            var a = (this.options.playbackRate - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
            this.status.playbackRateEnabled ? (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.show(), this.css.jq.playbackRateBarValue.length && (this.css.jq.playbackRateBarValue.show(), this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](100 * a + "%"))) :
                (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.hide(), this.css.jq.playbackRateBarValue.length && this.css.jq.playbackRateBarValue.hide())
        },
        repeat: function() {
            this._loop(!0)
        },
        repeatOff: function() {
            this._loop(!1)
        },
        _loop: function(a) {
            this.options.loop !== a && (this.options.loop = a, this._updateButtons(), this._trigger(b.jPlayer.event.repeat))
        },
        currentTime: function() {},
        duration: function() {},
        gui: function() {},
        noSolution: function() {},
        option: function(a, c) {
            var d = a;
            if (0 === arguments.length) return b.extend(!0, {}, this.options);
            if ("string" === typeof a) {
                var e = a.split(".");
                if (c === f) {
                    for (var d = b.extend(!0, {}, this.options), g = 0; g < e.length; g++)
                        if (d[e[g]] !== f) d = d[e[g]];
                        else return this._warning({
                            type: b.jPlayer.warning.OPTION_KEY,
                            context: a,
                            message: b.jPlayer.warningMsg.OPTION_KEY,
                            hint: b.jPlayer.warningHint.OPTION_KEY
                        }), f;
                    return d
                }
                for (var g = d = {}, h = 0; h < e.length; h++) h < e.length - 1 ? (g[e[h]] = {}, g = g[e[h]]) : g[e[h]] = c
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function(a) {
            var c = this;
            b.each(a, function(a, b) {
                c._setOption(a,
                    b)
            });
            return this
        },
        _setOption: function(a, c) {
            var d = this;
            switch (a) {
                case "volume":
                    this.volume(c);
                    break;
                case "muted":
                    this._muted(c);
                    break;
                case "globalVolume":
                    this.options[a] = c;
                    break;
                case "cssSelectorAncestor":
                    this._cssSelectorAncestor(c);
                    break;
                case "cssSelector":
                    b.each(c, function(a, c) {
                        d._cssSelector(a, c)
                    });
                    break;
                case "playbackRate":
                    this.options[a] = c = this._limitValue(c, this.options.minPlaybackRate, this.options.maxPlaybackRate);
                    this.html.used && this._html_setProperty("playbackRate", c);
                    this._updatePlaybackRate();
                    break;
                case "defaultPlaybackRate":
                    this.options[a] = c = this._limitValue(c, this.options.minPlaybackRate, this.options.maxPlaybackRate);
                    this.html.used && this._html_setProperty("defaultPlaybackRate", c);
                    this._updatePlaybackRate();
                    break;
                case "minPlaybackRate":
                    this.options[a] = c = this._limitValue(c, 0.1, this.options.maxPlaybackRate - 0.1);
                    this._updatePlaybackRate();
                    break;
                case "maxPlaybackRate":
                    this.options[a] = c = this._limitValue(c, this.options.minPlaybackRate + 0.1, 16);
                    this._updatePlaybackRate();
                    break;
                case "fullScreen":
                    if (this.options[a] !==
                        c) {
                        var e = b.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                        if (!e || e && !this.status.waitForPlay) e || (this.options[a] = c), c ? this._requestFullscreen() : this._exitFullscreen(), e || this._setOption("fullWindow", c)
                    }
                    break;
                case "fullWindow":
                    this.options[a] !== c && (this._removeUiClass(), this.options[a] = c, this._refreshSize());
                    break;
                case "size":
                    this.options.fullWindow || this.options[a].cssClass === c.cssClass || this._removeUiClass();
                    this.options[a] = b.extend({}, this.options[a], c);
                    this._refreshSize();
                    break;
                case "sizeFull":
                    this.options.fullWindow &&
                        this.options[a].cssClass !== c.cssClass && this._removeUiClass();
                    this.options[a] = b.extend({}, this.options[a], c);
                    this._refreshSize();
                    break;
                case "autohide":
                    this.options[a] = b.extend({}, this.options[a], c);
                    this._updateAutohide();
                    break;
                case "loop":
                    this._loop(c);
                    break;
                case "nativeVideoControls":
                    this.options[a] = b.extend({}, this.options[a], c);
                    this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                    this._restrictNativeVideoControls();
                    this._updateNativeVideoControls();
                    break;
                case "noFullWindow":
                    this.options[a] =
                        b.extend({}, this.options[a], c);
                    this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                    this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
                    this._restrictNativeVideoControls();
                    this._updateButtons();
                    break;
                case "noVolume":
                    this.options[a] = b.extend({}, this.options[a], c);
                    this.status.noVolume = this._uaBlocklist(this.options.noVolume);
                    this._updateVolume();
                    this._updateMute();
                    break;
                case "emulateHtml":
                    this.options[a] !== c && ((this.options[a] = c) ? this._emulateHtmlBridge() :
                        this._destroyHtmlBridge());
                    break;
                case "timeFormat":
                    this.options[a] = b.extend({}, this.options[a], c);
                    break;
                case "keyEnabled":
                    this.options[a] = c;
                    c || this !== b.jPlayer.focus || (b.jPlayer.focus = null);
                    break;
                case "keyBindings":
                    this.options[a] = b.extend(!0, {}, this.options[a], c);
                    break;
                case "audioFullScreen":
                    this.options[a] = c
            }
            return this
        },
        _refreshSize: function() {
            this._setSize();
            this._addUiClass();
            this._updateSize();
            this._updateButtons();
            this._updateAutohide();
            this._trigger(b.jPlayer.event.resize)
        },
        _setSize: function() {
            this.options.fullWindow ?
                (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass);
            this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
        },
        _removeUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
        },
        _updateSize: function() {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _updateAutohide: function() {
            var a = this,
                c = function() {
                    a.css.jq.gui.fadeIn(a.options.autohide.fadeIn, function() {
                        clearTimeout(a.internal.autohideId);
                        a.internal.autohideId = setTimeout(function() {
                            a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)
                        }, a.options.autohide.hold)
                    })
                };
            this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(".jPlayerAutohide"), this.css.jq.gui.unbind(".jPlayerAutohide"), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind("mousemove.jPlayer.jPlayerAutohide", c), this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide", c), this.css.jq.gui.hide()) : this.css.jq.gui.show())
        },
        fullScreen: function() {
            this._setOption("fullScreen", !0)
        },
        restoreScreen: function() {
            this._setOption("fullScreen", !1)
        },
        _fullscreenAddEventListeners: function() {
            var a = this,
                c = b.jPlayer.nativeFeatures.fullscreen;
            c.api.fullscreenEnabled && c.event.fullscreenchange && ("function" !== typeof this.internal.fullscreenchangeHandler &&
                (this.internal.fullscreenchangeHandler = function() {
                    a._fullscreenchange()
                }), document.addEventListener(c.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
        },
        _fullscreenRemoveEventListeners: function() {
            var a = b.jPlayer.nativeFeatures.fullscreen;
            this.internal.fullscreenchangeHandler && document.addEventListener(a.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
        },
        _fullscreenchange: function() {
            this.options.fullScreen && !b.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() &&
                this._setOption("fullScreen", !1)
        },
        _requestFullscreen: function() {
            var a = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
                c = b.jPlayer.nativeFeatures.fullscreen;
            c.used.webkitVideo && (a = this.htmlElement.video);
            c.api.fullscreenEnabled && c.api.requestFullscreen(a)
        },
        _exitFullscreen: function() {
            var a = b.jPlayer.nativeFeatures.fullscreen,
                c;
            a.used.webkitVideo && (c = this.htmlElement.video);
            a.api.fullscreenEnabled && a.api.exitFullscreen(c)
        },
        _html_initMedia: function(a) {
            var c = b(this.htmlElement.media).empty();
            b.each(a.track || [], function(a, b) {
                var g = document.createElement("track");
                g.setAttribute("kind", b.kind ? b.kind : "");
                g.setAttribute("src", b.src ? b.src : "");
                g.setAttribute("srclang", b.srclang ? b.srclang : "");
                g.setAttribute("label", b.label ? b.label : "");
                b.def && g.setAttribute("default", b.def);
                c.append(g)
            });
            this.htmlElement.media.src = this.status.src;
            "none" !== this.options.preload && this._html_load();
            this._trigger(b.jPlayer.event.timeupdate)
        },
        _html_setFormat: function(a) {
            var c = this;
            b.each(this.formats, function(b, e) {
                if (c.html.support[e] &&
                    a[e]) return c.status.src = a[e], c.status.format[e] = !0, c.status.formatType = e, !1
            })
        },
        _html_setAudio: function(a) {
            this._html_setFormat(a);
            this.htmlElement.media = this.htmlElement.audio;
            this._html_initMedia(a)
        },
        _html_setVideo: function(a) {
            this._html_setFormat(a);
            this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(a.poster) ? a.poster : "");
            this.htmlElement.media = this.htmlElement.video;
            this._html_initMedia(a)
        },
        _html_resetMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.id !==
                this.internal.video.id || this.status.nativeVideoControls || this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.htmlElement.media.pause())
        },
        _html_clearMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.src = "about:blank", this.htmlElement.media.load())
        },
        _html_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load());
            clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function(a) {
            var b = this,
                d = this.htmlElement.media;
            this._html_load();
            if (isNaN(a)) d.play();
            else {
                this.internal.cmdsIgnored && d.play();
                try {
                    if (!d.seekable || "object" === typeof d.seekable && 0 < d.seekable.length) d.currentTime = a, d.play();
                    else throw 1;
                } catch (e) {
                    this.internal.htmlDlyCmdId = setTimeout(function() {
                        b.play(a)
                    }, 250);
                    return
                }
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function(a) {
            var b = this,
                d = this.htmlElement.media;
            0 < a ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId);
            d.pause();
            if (!isNaN(a)) try {
                if (!d.seekable || "object" === typeof d.seekable && 0 < d.seekable.length) d.currentTime = a;
                else throw 1;
            } catch (e) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.pause(a)
                }, 250);
                return
            }
            0 < a && this._html_checkWaitForPlay()
        },
        _html_playHead: function(a) {
            var b = this,
                d = this.htmlElement.media;
            this._html_load();
            try {
                if ("object" === typeof d.seekable && 0 < d.seekable.length) d.currentTime = a * d.seekable.end(d.seekable.length - 1) / 100;
                else if (0 < d.duration && !isNaN(d.duration)) d.currentTime = a * d.duration / 100;
                else throw "e";
            } catch (e) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.playHead(a)
                }, 250);
                return
            }
            this.status.waitForLoad ||
                this._html_checkWaitForPlay()
        },
        _html_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _html_setProperty: function(a, b) {
            this.html.audio.available && (this.htmlElement.audio[a] = b);
            this.html.video.available && (this.htmlElement.video[a] = b)
        },
        _flash_setAudio: function(a) {
            var c = this;
            try {
                b.each(this.formats,
                    function(b, d) {
                        if (c.flash.support[d] && a[d]) {
                            switch (d) {
                                case "m4a":
                                case "fla":
                                    c._getMovie().fl_setAudio_m4a(a[d]);
                                    break;
                                case "mp3":
                                    c._getMovie().fl_setAudio_mp3(a[d]);
                                    break;
                                case "rtmpa":
                                    c._getMovie().fl_setAudio_rtmp(a[d])
                            }
                            c.status.src = a[d];
                            c.status.format[d] = !0;
                            c.status.formatType = d;
                            return !1
                        }
                    }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
            } catch (d) {
                this._flashError(d)
            }
        },
        _flash_setVideo: function(a) {
            var c = this;
            try {
                b.each(this.formats, function(b, d) {
                    if (c.flash.support[d] &&
                        a[d]) {
                        switch (d) {
                            case "m4v":
                            case "flv":
                                c._getMovie().fl_setVideo_m4v(a[d]);
                                break;
                            case "rtmpv":
                                c._getMovie().fl_setVideo_rtmp(a[d])
                        }
                        c.status.src = a[d];
                        c.status.format[d] = !0;
                        c.status.formatType = d;
                        return !1
                    }
                }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
            } catch (d) {
                this._flashError(d)
            }
        },
        _flash_resetMedia: function() {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            });
            this._flash_pause(NaN)
        },
        _flash_clearMedia: function() {
            try {
                this._getMovie().fl_clearMedia()
            } catch (a) {
                this._flashError(a)
            }
        },
        _flash_load: function() {
            try {
                this._getMovie().fl_load()
            } catch (a) {
                this._flashError(a)
            }
            this.status.waitForLoad = !1
        },
        _flash_play: function(a) {
            try {
                this._getMovie().fl_play(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad = !1;
            this._flash_checkWaitForPlay()
        },
        _flash_pause: function(a) {
            try {
                this._getMovie().fl_pause(a)
            } catch (b) {
                this._flashError(b)
            }
            0 < a && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
        },
        _flash_playHead: function(a) {
            try {
                this._getMovie().fl_play_head(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad ||
                this._flash_checkWaitForPlay()
        },
        _flash_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _flash_volume: function(a) {
            try {
                this._getMovie().fl_volume(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _flash_mute: function(a) {
            try {
                this._getMovie().fl_mute(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _getMovie: function() {
            return document[this.internal.flash.id]
        },
        _getFlashPluginVersion: function() {
            var a = 0,
                b;
            if (window.ActiveXObject) try {
                if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    var d = b.GetVariable("$version");
                    d && (d = d.split(" ")[1].split(","), a = parseInt(d[0], 10) + "." + parseInt(d[1], 10))
                }
            } catch (e) {} else navigator.plugins && 0 < navigator.mimeTypes.length && (b = navigator.plugins["Shockwave Flash"]) && (a = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1"));
            return 1 * a
        },
        _checkForFlash: function(a) {
            var b = !1;
            this._getFlashPluginVersion() >=
                a && (b = !0);
            return b
        },
        _validString: function(a) {
            return a && "string" === typeof a
        },
        _limitValue: function(a, b, d) {
            return a < b ? b : a > d ? d : a
        },
        _urlNotSetError: function(a) {
            this._error({
                type: b.jPlayer.error.URL_NOT_SET,
                context: a,
                message: b.jPlayer.errorMsg.URL_NOT_SET,
                hint: b.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function(a) {
            var c;
            c = this.internal.ready ? "FLASH_DISABLED" : "FLASH";
            this._error({
                type: b.jPlayer.error[c],
                context: this.internal.flash.swf,
                message: b.jPlayer.errorMsg[c] + a.message,
                hint: b.jPlayer.errorHint[c]
            });
            this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function(a) {
            this._trigger(b.jPlayer.event.error, a);
            this.options.errorAlerts && this._alert("Error!" + (a.message ? "\n" + a.message : "") + (a.hint ? "\n" + a.hint : "") + "\nContext: " + a.context)
        },
        _warning: function(a) {
            this._trigger(b.jPlayer.event.warning, f, a);
            this.options.warningAlerts && this._alert("Warning!" + (a.message ? "\n" + a.message : "") + (a.hint ? "\n" + a.hint : "") + "\nContext: " + a.context)
        },
        _alert: function(a) {
            a = "jPlayer " + this.version.script + " : id='" + this.internal.self.id +
                "' : " + a;
            this.options.consoleAlerts ? console && console.log && console.log(a) : alert(a)
        },
        _emulateHtmlBridge: function() {
            var a = this;
            b.each(b.jPlayer.emulateMethods.split(/\s+/g), function(b, d) {
                a.internal.domNode[d] = function(b) {
                    a[d](b)
                }
            });
            b.each(b.jPlayer.event, function(c, d) {
                var e = !0;
                b.each(b.jPlayer.reservedEvent.split(/\s+/g), function(a, b) {
                    if (b === c) return e = !1
                });
                e && a.element.bind(d + ".jPlayer.jPlayerHtml", function() {
                    a._emulateHtmlUpdate();
                    var b = document.createEvent("Event");
                    b.initEvent(c, !1, !0);
                    a.internal.domNode.dispatchEvent(b)
                })
            })
        },
        _emulateHtmlUpdate: function() {
            var a = this;
            b.each(b.jPlayer.emulateStatus.split(/\s+/g), function(b, d) {
                a.internal.domNode[d] = a.status[d]
            });
            b.each(b.jPlayer.emulateOptions.split(/\s+/g), function(b, d) {
                a.internal.domNode[d] = a.options[d]
            })
        },
        _destroyHtmlBridge: function() {
            var a = this;
            this.element.unbind(".jPlayerHtml");
            b.each((b.jPlayer.emulateMethods + " " + b.jPlayer.emulateStatus + " " + b.jPlayer.emulateOptions).split(/\s+/g), function(b, d) {
                delete a.internal.domNode[d]
            })
        }
    };
    b.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    };
    b.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + b.jPlayer.prototype.version.script + " needs Jplayer.swf version " + b.jPlayer.prototype.version.needFlash + " but found "
    };
    b.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    };
    b.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    };
    b.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    };
    b.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
});

;
(function($, window, undefined) {
    var pluginName = 'prettyCheckable',
        document = window.document,
        defaults = {
            label: '',
            labelPosition: 'right',
            customClass: '',
            color: 'blue'
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    function addCheckableEvents(element) {
        if (window.ko) {
            $(element).on('change', function(e) {
                e.preventDefault();
                if (e.originalEvent === undefined) {
                    var clickedParent = $(this).closest('.clearfix');
                    var fakeCheckable = $(clickedParent).find('a');
                    var input = clickedParent.find('input');
                    var isChecked = input.prop('checked');
                    if (isChecked === true) {
                        fakeCheckable.addClass('checked');
                    } else {
                        fakeCheckable.removeClass('checked');
                    }
                }
            });
        }
        element.find('a, label').on('touchstart click', function(e) {
            e.preventDefault();
            var clickedParent = $(this).closest('.clearfix');
            var input = clickedParent.find('input');
            var fakeCheckable = clickedParent.find('a');
            if (input.prop('disabled') === true) {
                return;
            }
            if (input.prop('type') === 'radio') {
                $('input[name="' + input.attr('name') + '"]').each(function(index, el) {
                    $(el).prop('checked', false).parent().find('a').removeClass('checked');
                });
            }
            if (window.ko) {
                ko.utils.triggerEvent(input[0], 'click');
            } else {
                input.click();
                if (input.prop('checked')) {
                    input.prop('checked', false).change();
                } else {
                    input.prop('checked', true).change();
                }
            }
            fakeCheckable.toggleClass('checked');
        });
        element.find('a').on('keyup', function(e) {
            if (e.keyCode === 32) {
                $(this).click();
            }
        });
    }
    Plugin.prototype.init = function() {
        var el = $(this.element);
        el.parent().addClass('has-pretty-child');
        el.css('display', 'none');
        var classType = el.data('type') !== undefined ? el.data('type') : el.attr('type');
        var label = el.data('label') !== undefined ? el.data('label') : this.options.label;
        var labelPosition = el.data('labelposition') !== undefined ? 'label' + el.data('labelposition') : 'label' + this.options.labelPosition;
        var customClass = el.data('customclass') !== undefined ? el.data('customclass') : this.options.customClass;
        var color = el.data('color') !== undefined ? el.data('color') : this.options.color;
        var disabled = el.prop('disabled') === true ? 'disabled' : '';
        var containerClasses = ['pretty' + classType, labelPosition, customClass, color, disabled].join(' ');
        el.wrap('<div class="clearfix ' + containerClasses + '"></div>').parent().html();
        var dom = [];
        var isChecked = el.prop('checked') ? 'checked' : '';
        var isDisabled = el.prop('disabled') ? true : false;
        if (labelPosition === 'labelright') {
            dom.push('<a href="#" class="' + isChecked + '"></a>');
            dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');
        } else {
            dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');
            dom.push('<a href="#" class="' + isChecked + '"></a>');
        }
        el.parent().append(dom.join('\n'));
        addCheckableEvents(el.parent());
    };
    Plugin.prototype.disableInput = function() {
        var el = $(this.element);
        el.parent().addClass('disabled');
        el.prop('disabled', true);
    };
    Plugin.prototype.enableInput = function() {
        var el = $(this.element);
        el.parent().removeClass('disabled');
        el.prop('disabled', false);
    };
    $.fn[pluginName] = function(options) {
        var inputs = [];
        this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                inputs.push($.data(this, 'plugin_' + pluginName, new Plugin(this, options)));
            }
        });
        return inputs;
    };
}(jQuery, window));



/*!
 * FullCalendar v1.6.3
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */
(function(t, e) {
    function n(e) {
        t.extend(!0, he, e)
    }

    function r(n, r, c) {
        function u(t) {
            ae ? p() && (T(), M(t)) : f()
        }

        function f() {
            oe = r.theme ? "ui" : "fc", n.addClass("fc"), r.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), r.theme && n.addClass("ui-widget"), ae = t("<div class='fc-content' style='position:relative'/>").prependTo(n), ne = new a(ee, r), re = ne.render(), re && n.prepend(re), y(r.defaultView), r.handleWindowResize && t(window).resize(x), m() || v()
        }

        function v() {
            setTimeout(function() {
                !ie.start && m() && C()
            }, 0)
        }

        function h() {
            ie && (te("viewDestroy", ie, ie, ie.element), ie.triggerEventDestroy()), t(window).unbind("resize", x), ne.destroy(), ae.remove(), n.removeClass("fc fc-rtl ui-widget")
        }

        function p() {
            return n.is(":visible")
        }

        function m() {
            return t("body").is(":visible")
        }

        function y(t) {
            ie && t == ie.name || w(t)
        }

        function w(e) {
            he++, ie && (te("viewDestroy", ie, ie, ie.element), B(), ie.triggerEventDestroy(), G(), ie.element.remove(), ne.deactivateButton(ie.name)), ne.activateButton(e), ie = new me[e](t("<div class='fc-view fc-view-" + e + "' style='position:relative'/>").appendTo(ae), ee), C(), $(), he--
        }

        function C(t) {
            (!ie.start || t || ie.start > ge || ge >= ie.end) && p() && M(t)
        }

        function M(t) {
            he++, ie.start && (te("viewDestroy", ie, ie, ie.element), B(), N()), G(), ie.render(ge, t || 0), S(), $(), (ie.afterRender || A)(), _(), q(), te("viewRender", ie, ie, ie.element), ie.trigger("viewDisplay", de), he--, z()
        }

        function E() {
            p() && (B(), N(), T(), S(), F())
        }

        function T() {
            le = r.contentHeight ? r.contentHeight : r.height ? r.height - (re ? re.height() : 0) - R(ae) : Math.round(ae.width() / Math.max(r.aspectRatio, .5))
        }

        function S() {
            le === e && T(), he++, ie.setHeight(le), ie.setWidth(ae.width()), he--, se = n.outerWidth()
        }

        function x() {
            if (!he)
                if (ie.start) {
                    var t = ++ve;
                    setTimeout(function() {
                        t == ve && !he && p() && se != (se = n.outerWidth()) && (he++, E(), ie.trigger("windowResize", de), he--)
                    }, 200)
                } else v()
        }

        function k() {
            N(), W()
        }

        function H(t) {
            N(), F(t)
        }

        function F(t) {
            p() && (ie.setEventData(pe), ie.renderEvents(pe, t), ie.trigger("eventAfterAllRender"))
        }

        function N() {
            ie.triggerEventDestroy(), ie.clearEvents(), ie.clearEventData()
        }

        function z() {
            !r.lazyFetching || ue(ie.visStart, ie.visEnd) ? W() : F()
        }

        function W() {
            fe(ie.visStart, ie.visEnd)
        }

        function O(t) {
            pe = t, F()
        }

        function L(t) {
            H(t)
        }

        function _() {
            ne.updateTitle(ie.title)
        }

        function q() {
            var t = new Date;
            t >= ie.start && ie.end > t ? ne.disableButton("today") : ne.enableButton("today")
        }

        function Y(t, n, r) {
            ie.select(t, n, r === e ? !0 : r)
        }

        function B() {
            ie && ie.unselect()
        }

        function P() {
            C(-1)
        }

        function j() {
            C(1)
        }

        function I() {
            i(ge, -1), C()
        }

        function X() {
            i(ge, 1), C()
        }

        function J() {
            ge = new Date, C()
        }

        function V(t, e, n) {
            t instanceof Date ? ge = d(t) : g(ge, t, e, n), C()
        }

        function U(t, n, r) {
            t !== e && i(ge, t), n !== e && s(ge, n), r !== e && l(ge, r), C()
        }

        function Z() {
            return d(ge)
        }

        function G() {
            ae.css({
                width: "100%",
                height: ae.height(),
                overflow: "hidden"
            })
        }

        function $() {
            ae.css({
                width: "",
                height: "",
                overflow: ""
            })
        }

        function Q() {
            return ie
        }

        function K(t, n) {
            return n === e ? r[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (r[t] = n, E()), e)
        }

        function te(t, n) {
            return r[t] ? r[t].apply(n || de, Array.prototype.slice.call(arguments, 2)) : e
        }
        var ee = this;
        ee.options = r, ee.render = u, ee.destroy = h, ee.refetchEvents = k, ee.reportEvents = O, ee.reportEventChange = L, ee.rerenderEvents = H, ee.changeView = y, ee.select = Y, ee.unselect = B, ee.prev = P, ee.next = j, ee.prevYear = I, ee.nextYear = X, ee.today = J, ee.gotoDate = V, ee.incrementDate = U, ee.formatDate = function(t, e) {
            return b(t, e, r)
        }, ee.formatDates = function(t, e, n) {
            return D(t, e, n, r)
        }, ee.getDate = Z, ee.getView = Q, ee.option = K, ee.trigger = te, o.call(ee, r, c);
        var ne, re, ae, oe, ie, se, le, ce, ue = ee.isFetchNeeded,
            fe = ee.fetchEvents,
            de = n[0],
            ve = 0,
            he = 0,
            ge = new Date,
            pe = [];
        g(ge, r.year, r.month, r.date), r.droppable && t(document).bind("dragstart", function(e, n) {
            var a = e.target,
                o = t(a);
            if (!o.parents(".fc").length) {
                var i = r.dropAccept;
                (t.isFunction(i) ? i.call(a, o) : o.is(i)) && (ce = a, ie.dragStart(ce, e, n))
            }
        }).bind("dragstop", function(t, e) {
            ce && (ie.dragStop(ce, t, e), ce = null)
        })
    }

    function a(n, r) {
        function a() {
            v = r.theme ? "ui" : "fc";
            var n = r.header;
            return n ? h = t("<table class='fc-header' style='width:100%'/>").append(t("<tr/>").append(i("left")).append(i("center")).append(i("right"))) : e
        }

        function o() {
            h.remove()
        }

        function i(e) {
            var a = t("<td class='fc-header-" + e + "'/>"),
                o = r.header[e];
            return o && t.each(o.split(" "), function(e) {
                e > 0 && a.append("<span class='fc-header-space'/>");
                var o;
                t.each(this.split(","), function(e, i) {
                    if ("title" == i) a.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>"), o && o.addClass(v + "-corner-right"), o = null;
                    else {
                        var s;
                        if (n[i] ? s = n[i] : me[i] && (s = function() {
                            u.removeClass(v + "-state-hover"), n.changeView(i)
                        }), s) {
                            var l = r.theme ? q(r.buttonIcons, i) : null,
                                c = q(r.buttonText, i),
                                u = t("<span class='fc-button fc-button-" + i + " " + v + "-state-default'>" + (l ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + l + "'/>" + "</span>" : c) + "</span>").click(function() {
                                    u.hasClass(v + "-state-disabled") || s()
                                }).mousedown(function() {
                                    u.not("." + v + "-state-active").not("." + v + "-state-disabled").addClass(v + "-state-down")
                                }).mouseup(function() {
                                    u.removeClass(v + "-state-down")
                                }).hover(function() {
                                    u.not("." + v + "-state-active").not("." + v + "-state-disabled").addClass(v + "-state-hover")
                                }, function() {
                                    u.removeClass(v + "-state-hover").removeClass(v + "-state-down")
                                }).appendTo(a);
                            B(u), o || u.addClass(v + "-corner-left"), o = u
                        }
                    }
                }), o && o.addClass(v + "-corner-right")
            }), a
        }

        function s(t) {
            h.find("h2").html(t)
        }

        function l(t) {
            h.find("span.fc-button-" + t).addClass(v + "-state-active")
        }

        function c(t) {
            h.find("span.fc-button-" + t).removeClass(v + "-state-active")
        }

        function u(t) {
            h.find("span.fc-button-" + t).addClass(v + "-state-disabled")
        }

        function f(t) {
            h.find("span.fc-button-" + t).removeClass(v + "-state-disabled")
        }
        var d = this;
        d.render = a, d.destroy = o, d.updateTitle = s, d.activateButton = l, d.deactivateButton = c, d.disableButton = u, d.enableButton = f;
        var v, h = t([])
    }

    function o(n, r) {
        function a(t, e) {
            return !E || E > t || e > T
        }

        function o(t, e) {
            E = t, T = e, W = [];
            var n = ++R,
                r = F.length;
            N = r;
            for (var a = 0; r > a; a++) i(F[a], n)
        }

        function i(e, r) {
            s(e, function(a) {
                if (r == R) {
                    if (a) {
                        n.eventDataTransform && (a = t.map(a, n.eventDataTransform)), e.eventDataTransform && (a = t.map(a, e.eventDataTransform));
                        for (var o = 0; a.length > o; o++) a[o].source = e, b(a[o]);
                        W = W.concat(a)
                    }
                    N--, N || k(W)
                }
            })
        }

        function s(r, a) {
            var o, i, l = pe.sourceFetchers;
            for (o = 0; l.length > o; o++) {
                if (i = l[o](r, E, T, a), i === !0) return;
                if ("object" == typeof i) return s(i, a), e
            }
            var c = r.events;
            if (c) t.isFunction(c) ? (m(), c(d(E), d(T), function(t) {
                a(t), y()
            })) : t.isArray(c) ? a(c) : a();
            else {
                var u = r.url;
                if (u) {
                    var f, v = r.success,
                        h = r.error,
                        g = r.complete;
                    f = t.isFunction(r.data) ? r.data() : r.data;
                    var p = t.extend({}, f || {}),
                        b = X(r.startParam, n.startParam),
                        D = X(r.endParam, n.endParam);
                    b && (p[b] = Math.round(+E / 1e3)), D && (p[D] = Math.round(+T / 1e3)), m(), t.ajax(t.extend({}, ye, r, {
                        data: p,
                        success: function(e) {
                            e = e || [];
                            var n = I(v, this, arguments);
                            t.isArray(n) && (e = n), a(e)
                        },
                        error: function() {
                            I(h, this, arguments), a()
                        },
                        complete: function() {
                            I(g, this, arguments), y()
                        }
                    }))
                } else a()
            }
        }

        function l(t) {
            t = c(t), t && (N++, i(t, R))
        }

        function c(n) {
            return t.isFunction(n) || t.isArray(n) ? n = {
                events: n
            } : "string" == typeof n && (n = {
                url: n
            }), "object" == typeof n ? (D(n), F.push(n), n) : e
        }

        function u(e) {
            F = t.grep(F, function(t) {
                return !w(t, e)
            }), W = t.grep(W, function(t) {
                return !w(t.source, e)
            }), k(W)
        }

        function f(t) {
            var e, n, r = W.length,
                a = x().defaultEventEnd,
                o = t.start - t._start,
                i = t.end ? t.end - (t._end || a(t)) : 0;
            for (e = 0; r > e; e++) n = W[e], n._id == t._id && n != t && (n.start = new Date(+n.start + o), n.end = t.end ? n.end ? new Date(+n.end + i) : new Date(+a(n) + i) : null, n.title = t.title, n.url = t.url, n.allDay = t.allDay, n.className = t.className, n.editable = t.editable, n.color = t.color, n.backgroundColor = t.backgroundColor, n.borderColor = t.borderColor, n.textColor = t.textColor, b(n));
            b(t), k(W)
        }

        function v(t, e) {
            b(t), t.source || (e && (H.events.push(t), t.source = H), W.push(t)), k(W)
        }

        function h(e) {
            if (e) {
                if (!t.isFunction(e)) {
                    var n = e + "";
                    e = function(t) {
                        return t._id == n
                    }
                }
                W = t.grep(W, e, !0);
                for (var r = 0; F.length > r; r++) t.isArray(F[r].events) && (F[r].events = t.grep(F[r].events, e, !0))
            } else {
                W = [];
                for (var r = 0; F.length > r; r++) t.isArray(F[r].events) && (F[r].events = [])
            }
            k(W)
        }

        function g(e) {
            return t.isFunction(e) ? t.grep(W, e) : e ? (e += "", t.grep(W, function(t) {
                return t._id == e
            })) : W
        }

        function m() {
            z++ || S("loading", null, !0)
        }

        function y() {
            --z || S("loading", null, !1)
        }

        function b(t) {
            var r = t.source || {}, a = X(r.ignoreTimezone, n.ignoreTimezone);
            t._id = t._id || (t.id === e ? "_fc" + be++ : t.id + ""), t.date && (t.start || (t.start = t.date), delete t.date), t._start = d(t.start = p(t.start, a)), t.end = p(t.end, a), t.end && t.end <= t.start && (t.end = null), t._end = t.end ? d(t.end) : null, t.allDay === e && (t.allDay = X(r.allDayDefault, n.allDayDefault)), t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = []
        }

        function D(t) {
            t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = [];
            for (var e = pe.sourceNormalizers, n = 0; e.length > n; n++) e[n](t)
        }

        function w(t, e) {
            return t && e && C(t) == C(e)
        }

        function C(t) {
            return ("object" == typeof t ? t.events || t.url : "") || t
        }
        var M = this;
        M.isFetchNeeded = a, M.fetchEvents = o, M.addEventSource = l, M.removeEventSource = u, M.updateEvent = f, M.renderEvent = v, M.removeEvents = h, M.clientEvents = g, M.normalizeEvent = b;
        for (var E, T, S = M.trigger, x = M.getView, k = M.reportEvents, H = {
                events: []
            }, F = [H], R = 0, N = 0, z = 0, W = [], A = 0; r.length > A; A++) c(r[A])
    }

    function i(t, e, n) {
        return t.setFullYear(t.getFullYear() + e), n || f(t), t
    }

    function s(t, e, n) {
        if (+t) {
            var r = t.getMonth() + e,
                a = d(t);
            for (a.setDate(1), a.setMonth(r), t.setMonth(r), n || f(t); t.getMonth() != a.getMonth();) t.setDate(t.getDate() + (a > t ? 1 : -1))
        }
        return t
    }

    function l(t, e, n) {
        if (+t) {
            var r = t.getDate() + e,
                a = d(t);
            a.setHours(9), a.setDate(r), t.setDate(r), n || f(t), c(t, a)
        }
        return t
    }

    function c(t, e) {
        if (+t)
            for (; t.getDate() != e.getDate();) t.setTime(+t + (e > t ? 1 : -1) * Ce)
    }

    function u(t, e) {
        return t.setMinutes(t.getMinutes() + e), t
    }

    function f(t) {
        return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
    }

    function d(t, e) {
        return e ? f(new Date(+t)) : new Date(+t)
    }

    function v() {
        var t, e = 0;
        do t = new Date(1970, e++, 1); while (t.getHours());
        return t
    }

    function h(t, e) {
        return Math.round((d(t, !0) - d(e, !0)) / we)
    }

    function g(t, n, r, a) {
        n !== e && n != t.getFullYear() && (t.setDate(1), t.setMonth(0), t.setFullYear(n)), r !== e && r != t.getMonth() && (t.setDate(1), t.setMonth(r)), a !== e && t.setDate(a)
    }

    function p(t, n) {
        return "object" == typeof t ? t : "number" == typeof t ? new Date(1e3 * t) : "string" == typeof t ? t.match(/^\d+(\.\d+)?$/) ? new Date(1e3 * parseFloat(t)) : (n === e && (n = !0), m(t, n) || (t ? new Date(t) : null)) : null
    }

    function m(t, e) {
        var n = t.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
        if (!n) return null;
        var r = new Date(n[1], 0, 1);
        if (e || !n[13]) {
            var a = new Date(n[1], 0, 1, 9, 0);
            n[3] && (r.setMonth(n[3] - 1), a.setMonth(n[3] - 1)), n[5] && (r.setDate(n[5]), a.setDate(n[5])), c(r, a), n[7] && r.setHours(n[7]), n[8] && r.setMinutes(n[8]), n[10] && r.setSeconds(n[10]), n[12] && r.setMilliseconds(1e3 * Number("0." + n[12])), c(r, a)
        } else if (r.setUTCFullYear(n[1], n[3] ? n[3] - 1 : 0, n[5] || 1), r.setUTCHours(n[7] || 0, n[8] || 0, n[10] || 0, n[12] ? 1e3 * Number("0." + n[12]) : 0), n[14]) {
            var o = 60 * Number(n[16]) + (n[18] ? Number(n[18]) : 0);
            o *= "-" == n[15] ? 1 : -1, r = new Date(+r + 1e3 * 60 * o)
        }
        return r
    }

    function y(t) {
        if ("number" == typeof t) return 60 * t;
        if ("object" == typeof t) return 60 * t.getHours() + t.getMinutes();
        var e = t.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
        if (e) {
            var n = parseInt(e[1], 10);
            return e[3] && (n %= 12, "p" == e[3].toLowerCase().charAt(0) && (n += 12)), 60 * n + (e[2] ? parseInt(e[2], 10) : 0)
        }
    }

    function b(t, e, n) {
        return D(t, null, e, n)
    }

    function D(t, e, n, r) {
        r = r || he;
        var a, o, i, s, l = t,
            c = e,
            u = n.length,
            f = "";
        for (a = 0; u > a; a++)
            if (o = n.charAt(a), "'" == o) {
                for (i = a + 1; u > i; i++)
                    if ("'" == n.charAt(i)) {
                        l && (f += i == a + 1 ? "'" : n.substring(a + 1, i), a = i);
                        break
                    }
            } else
        if ("(" == o) {
            for (i = a + 1; u > i; i++)
                if (")" == n.charAt(i)) {
                    var d = b(l, n.substring(a + 1, i), r);
                    parseInt(d.replace(/\D/, ""), 10) && (f += d), a = i;
                    break
                }
        } else if ("[" == o) {
            for (i = a + 1; u > i; i++)
                if ("]" == n.charAt(i)) {
                    var v = n.substring(a + 1, i),
                        d = b(l, v, r);
                    d != b(c, v, r) && (f += d), a = i;
                    break
                }
        } else if ("{" == o) l = e, c = t;
        else if ("}" == o) l = t, c = e;
        else {
            for (i = u; i > a; i--)
                if (s = Ee[n.substring(a, i)]) {
                    l && (f += s(l, r)), a = i - 1;
                    break
                }
            i == a && l && (f += o)
        }
        return f
    }

    function w(t) {
        var e, n = new Date(t.getTime());
        return n.setDate(n.getDate() + 4 - (n.getDay() || 7)), e = n.getTime(), n.setMonth(0), n.setDate(1), Math.floor(Math.round((e - n) / 864e5) / 7) + 1
    }

    function C(t) {
        return t.end ? M(t.end, t.allDay) : l(d(t.start), 1)
    }

    function M(t, e) {
        return t = d(t), e || t.getHours() || t.getMinutes() ? l(t, 1) : f(t)
    }

    function E(n, r, a) {
        n.unbind("mouseover").mouseover(function(n) {
            for (var o, i, s, l = n.target; l != this;) o = l, l = l.parentNode;
            (i = o._fci) !== e && (o._fci = e, s = r[i], a(s.event, s.element, s), t(n.target).trigger(n)), n.stopPropagation()
        })
    }

    function T(e, n, r) {
        for (var a, o = 0; e.length > o; o++) a = t(e[o]), a.width(Math.max(0, n - x(a, r)))
    }

    function S(e, n, r) {
        for (var a, o = 0; e.length > o; o++) a = t(e[o]), a.height(Math.max(0, n - R(a, r)))
    }

    function x(t, e) {
        return k(t) + F(t) + (e ? H(t) : 0)
    }

    function k(e) {
        return (parseFloat(t.css(e[0], "paddingLeft", !0)) || 0) + (parseFloat(t.css(e[0], "paddingRight", !0)) || 0)
    }

    function H(e) {
        return (parseFloat(t.css(e[0], "marginLeft", !0)) || 0) + (parseFloat(t.css(e[0], "marginRight", !0)) || 0)
    }

    function F(e) {
        return (parseFloat(t.css(e[0], "borderLeftWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderRightWidth", !0)) || 0)
    }

    function R(t, e) {
        return N(t) + W(t) + (e ? z(t) : 0)
    }

    function N(e) {
        return (parseFloat(t.css(e[0], "paddingTop", !0)) || 0) + (parseFloat(t.css(e[0], "paddingBottom", !0)) || 0)
    }

    function z(e) {
        return (parseFloat(t.css(e[0], "marginTop", !0)) || 0) + (parseFloat(t.css(e[0], "marginBottom", !0)) || 0)
    }

    function W(e) {
        return (parseFloat(t.css(e[0], "borderTopWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderBottomWidth", !0)) || 0)
    }

    function A() {}

    function O(t, e) {
        return t - e
    }

    function L(t) {
        return Math.max.apply(Math, t)
    }

    function _(t) {
        return (10 > t ? "0" : "") + t
    }

    function q(t, n) {
        if (t[n] !== e) return t[n];
        for (var r, a = n.split(/(?=[A-Z])/), o = a.length - 1; o >= 0; o--)
            if (r = t[a[o].toLowerCase()], r !== e) return r;
        return t[""]
    }

    function Y(t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function B(t) {
        t.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
            return !1
        })
    }

    function P(t) {
        t.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
    }

    function j(t, e) {
        var n = t.source || {}, r = t.color,
            a = n.color,
            o = e("eventColor"),
            i = t.backgroundColor || r || n.backgroundColor || a || e("eventBackgroundColor") || o,
            s = t.borderColor || r || n.borderColor || a || e("eventBorderColor") || o,
            l = t.textColor || n.textColor || e("eventTextColor"),
            c = [];
        return i && c.push("background-color:" + i), s && c.push("border-color:" + s), l && c.push("color:" + l), c.join(";")
    }

    function I(e, n, r) {
        if (t.isFunction(e) && (e = [e]), e) {
            var a, o;
            for (a = 0; e.length > a; a++) o = e[a].apply(n, r) || o;
            return o
        }
    }

    function X() {
        for (var t = 0; arguments.length > t; t++)
            if (arguments[t] !== e) return arguments[t]
    }

    function J(t, e) {
        function n(t, e) {
            e && (s(t, e), t.setDate(1));
            var n = a("firstDay"),
                f = d(t, !0);
            f.setDate(1);
            var v = s(d(f), 1),
                g = d(f);
            l(g, -((g.getDay() - n + 7) % 7)), i(g);
            var p = d(v);
            l(p, (7 - p.getDay() + n) % 7), i(p, -1, !0);
            var m = c(),
                y = Math.round(h(p, g) / 7);
            "fixed" == a("weekMode") && (l(p, 7 * (6 - y)), y = 6), r.title = u(f, a("titleFormat")), r.start = f, r.end = v, r.visStart = g, r.visEnd = p, o(y, m, !0)
        }
        var r = this;
        r.render = n, Z.call(r, t, e, "month");
        var a = r.opt,
            o = r.renderBasic,
            i = r.skipHiddenDays,
            c = r.getCellsPerWeek,
            u = e.formatDate
    }

    function V(t, e) {
        function n(t, e) {
            e && l(t, 7 * e);
            var n = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)),
                u = l(d(n), 7),
                f = d(n);
            i(f);
            var v = d(u);
            i(v, -1, !0);
            var h = s();
            r.start = n, r.end = u, r.visStart = f, r.visEnd = v, r.title = c(f, l(d(v), -1), a("titleFormat")), o(1, h, !1)
        }
        var r = this;
        r.render = n, Z.call(r, t, e, "basicWeek");
        var a = r.opt,
            o = r.renderBasic,
            i = r.skipHiddenDays,
            s = r.getCellsPerWeek,
            c = e.formatDates
    }

    function U(t, e) {
        function n(t, e) {
            e && l(t, e), i(t, 0 > e ? -1 : 1);
            var n = d(t, !0),
                c = l(d(n), 1);
            r.title = s(t, a("titleFormat")), r.start = r.visStart = n, r.end = r.visEnd = c, o(1, 1, !1)
        }
        var r = this;
        r.render = n, Z.call(r, t, e, "basicDay");
        var a = r.opt,
            o = r.renderBasic,
            i = r.skipHiddenDays,
            s = e.formatDate
    }

    function Z(e, n, r) {
        function a(t, e, n) {
            ee = t, ne = e, re = n, o(), j || i(), s()
        }

        function o() {
            he = be("theme") ? "ui" : "fc", ge = be("columnFormat"), pe = be("weekNumbers"), me = be("weekNumberTitle"), ye = "iso" != be("weekNumberCalculation") ? "w" : "W"
        }

        function i() {
            Z = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(e)
        }

        function s() {
            var n = c();
            L && L.remove(), L = t(n).appendTo(e), _ = L.find("thead"), q = _.find(".fc-day-header"), j = L.find("tbody"), I = j.find("tr"), X = j.find(".fc-day"), J = I.find("td:first-child"), V = I.eq(0).find(".fc-day > div"), U = I.eq(0).find(".fc-day-content > div"), P(_.add(_.find("tr"))), P(I), I.eq(0).addClass("fc-first"), I.filter(":last").addClass("fc-last"), X.each(function(e, n) {
                var r = Te(Math.floor(e / ne), e % ne);
                we("dayRender", O, r, t(n))
            }), y(X)
        }

        function c() {
            var t = "<table class='fc-border-separate' style='width:100%' cellspacing='0'>" + u() + v() + "</table>";
            return t
        }

        function u() {
            var t, e, n = he + "-widget-header",
                r = "";
            for (r += "<thead><tr>", pe && (r += "<th class='fc-week-number " + n + "'>" + Y(me) + "</th>"), t = 0; ne > t; t++) e = Te(0, t), r += "<th class='fc-day-header fc-" + De[e.getDay()] + " " + n + "'>" + Y(ke(e, ge)) + "</th>";
            return r += "</tr></thead>"
        }

        function v() {
            var t, e, n, r = he + "-widget-content",
                a = "";
            for (a += "<tbody>", t = 0; ee > t; t++) {
                for (a += "<tr class='fc-week'>", pe && (n = Te(t, 0), a += "<td class='fc-week-number " + r + "'>" + "<div>" + Y(ke(n, ye)) + "</div>" + "</td>"), e = 0; ne > e; e++) n = Te(t, e), a += h(n);
                a += "</tr>"
            }
            return a += "</tbody>"
        }

        function h(t) {
            var e = he + "-widget-content",
                n = O.start.getMonth(),
                r = f(new Date),
                a = "",
                o = ["fc-day", "fc-" + De[t.getDay()], e];
            return t.getMonth() != n && o.push("fc-other-month"), +t == +r ? o.push("fc-today", he + "-state-highlight") : r > t ? o.push("fc-past") : o.push("fc-future"), a += "<td class='" + o.join(" ") + "'" + " data-date='" + ke(t, "yyyy-MM-dd") + "'" + ">" + "<div>", re && (a += "<div class='fc-day-number'>" + t.getDate() + "</div>"), a += "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
        }

        function g(e) {
            Q = e;
            var n, r, a, o = Q - _.height();
            "variable" == be("weekMode") ? n = r = Math.floor(o / (1 == ee ? 2 : 6)) : (n = Math.floor(o / ee), r = o - n * (ee - 1)), J.each(function(e, o) {
                ee > e && (a = t(o), a.find("> div").css("min-height", (e == ee - 1 ? r : n) - R(a)))
            })
        }

        function p(t) {
            $ = t, se.clear(), de.clear(), te = 0, pe && (te = _.find("th.fc-week-number").outerWidth()), K = Math.floor(($ - te) / ne), T(q.slice(0, -1), K)
        }

        function y(t) {
            t.click(b).mousedown(Ee)
        }

        function b(e) {
            if (!be("selectable")) {
                var n = m(t(this).data("date"));
                we("dayClick", this, n, !0, e)
            }
        }

        function D(t, e, n) {
            n && oe.build();
            for (var r = xe(t, e), a = 0; r.length > a; a++) {
                var o = r[a];
                y(w(o.row, o.leftCol, o.row, o.rightCol))
            }
        }

        function w(t, n, r, a) {
            var o = oe.rect(t, n, r, a, e);
            return Ce(o, e)
        }

        function C(t) {
            return d(t)
        }

        function M(t, e) {
            D(t, l(d(e), 1), !0)
        }

        function E() {
            Me()
        }

        function S(t, e, n) {
            var r = Se(t),
                a = X[r.row * ne + r.col];
            we("dayClick", a, t, e, n)
        }

        function x(t, e) {
            ie.start(function(t) {
                Me(), t && w(t.row, t.col, t.row, t.col)
            }, e)
        }

        function k(t, e, n) {
            var r = ie.stop();
            if (Me(), r) {
                var a = Te(r);
                we("drop", t, a, !0, e, n)
            }
        }

        function H(t) {
            return d(t.start)
        }

        function F(t) {
            return se.left(t)
        }

        function N(t) {
            return se.right(t)
        }

        function z(t) {
            return de.left(t)
        }

        function W(t) {
            return de.right(t)
        }

        function A(t) {
            return I.eq(t)
        }
        var O = this;
        O.renderBasic = a, O.setHeight = g, O.setWidth = p, O.renderDayOverlay = D, O.defaultSelectionEnd = C, O.renderSelection = M, O.clearSelection = E, O.reportDayClick = S, O.dragStart = x, O.dragStop = k, O.defaultEventEnd = H, O.getHoverListener = function() {
            return ie
        }, O.colLeft = F, O.colRight = N, O.colContentLeft = z, O.colContentRight = W, O.getIsCellAllDay = function() {
            return !0
        }, O.allDayRow = A, O.getRowCnt = function() {
            return ee
        }, O.getColCnt = function() {
            return ne
        }, O.getColWidth = function() {
            return K
        }, O.getDaySegmentContainer = function() {
            return Z
        }, ae.call(O, e, n, r), ce.call(O), le.call(O), G.call(O);
        var L, _, q, j, I, X, J, V, U, Z, $, Q, K, te, ee, ne, re, oe, ie, se, de, he, ge, pe, me, ye, be = O.opt,
            we = O.trigger,
            Ce = O.renderOverlay,
            Me = O.clearOverlays,
            Ee = O.daySelectionMousedown,
            Te = O.cellToDate,
            Se = O.dateToCell,
            xe = O.rangeToSegments,
            ke = n.formatDate;
        B(e.addClass("fc-grid")), oe = new ue(function(e, n) {
            var r, a, o;
            q.each(function(e, i) {
                r = t(i), a = r.offset().left, e && (o[1] = a), o = [a], n[e] = o
            }), o[1] = a + r.outerWidth(), I.each(function(n, i) {
                ee > n && (r = t(i), a = r.offset().top, n && (o[1] = a), o = [a], e[n] = o)
            }), o[1] = a + r.outerHeight()
        }), ie = new fe(oe), se = new ve(function(t) {
            return V.eq(t)
        }), de = new ve(function(t) {
            return U.eq(t)
        })
    }

    function G() {
        function t(t, e) {
            n.renderDayEvents(t, e)
        }

        function e() {
            n.getDaySegmentContainer().empty()
        }
        var n = this;
        n.renderEvents = t, n.clearEvents = e, oe.call(n)
    }

    function $(t, e) {
        function n(t, e) {
            e && l(t, 7 * e);
            var n = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)),
                u = l(d(n), 7),
                f = d(n);
            i(f);
            var v = d(u);
            i(v, -1, !0);
            var h = s();
            r.title = c(f, l(d(v), -1), a("titleFormat")), r.start = n, r.end = u, r.visStart = f, r.visEnd = v, o(h)
        }
        var r = this;
        r.render = n, K.call(r, t, e, "agendaWeek");
        var a = r.opt,
            o = r.renderAgenda,
            i = r.skipHiddenDays,
            s = r.getCellsPerWeek,
            c = e.formatDates
    }

    function Q(t, e) {
        function n(t, e) {
            e && l(t, e), i(t, 0 > e ? -1 : 1);
            var n = d(t, !0),
                c = l(d(n), 1);
            r.title = s(t, a("titleFormat")), r.start = r.visStart = n, r.end = r.visEnd = c, o(1)
        }
        var r = this;
        r.render = n, K.call(r, t, e, "agendaDay");
        var a = r.opt,
            o = r.renderAgenda,
            i = r.skipHiddenDays,
            s = e.formatDate
    }

    function K(n, r, a) {
        function o(t) {
            Ae = t, i(), K ? c() : s()
        }

        function i() {
            Be = Ze("theme") ? "ui" : "fc", Pe = Ze("isRTL"), je = y(Ze("minTime")), Ie = y(Ze("maxTime")), Xe = Ze("columnFormat"), Je = Ze("weekNumbers"), Ve = Ze("weekNumberTitle"), Ue = "iso" != Ze("weekNumberCalculation") ? "w" : "W", Ne = Ze("snapMinutes") || Ze("slotMinutes")
        }

        function s() {
            var e, r, a, o, i, s = Be + "-widget-header",
                l = Be + "-widget-content",
                f = 0 == Ze("slotMinutes") % 15;
            for (c(), ge = t("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(n), Ze("allDaySlot") ? (pe = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ge), e = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + s + " fc-agenda-axis'>" + Ze("allDayText") + "</th>" + "<td>" + "<div class='fc-day-content'><div style='position:relative'/></div>" + "</td>" + "<th class='" + s + " fc-agenda-gutter'>&nbsp;</th>" + "</tr>" + "</table>", me = t(e).appendTo(ge), ye = me.find("tr"), C(ye.find("td")), ge.append("<div class='fc-agenda-divider " + s + "'>" + "<div class='fc-agenda-divider-inner'/>" + "</div>")) : pe = t([]), be = t("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(ge), we = t("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(be), Ce = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(we), e = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>", r = v(), o = u(d(r), Ie), u(r, je), Oe = 0, a = 0; o > r; a++) i = r.getMinutes(), e += "<tr class='fc-slot" + a + " " + (i ? "fc-minor" : "") + "'>" + "<th class='fc-agenda-axis " + s + "'>" + (f && i ? "&nbsp;" : sn(r, Ze("axisFormat"))) + "</th>" + "<td class='" + l + "'>" + "<div style='position:relative'>&nbsp;</div>" + "</td>" + "</tr>", u(r, Ze("slotMinutes")), Oe++;
            e += "</tbody></table>", Me = t(e).appendTo(we), Ee = Me.find("div:first"), M(Me.find("td"))
        }

        function c() {
            var e = h();
            K && K.remove(), K = t(e).appendTo(n), ee = K.find("thead"), ne = ee.find("th").slice(1, -1), re = K.find("tbody"), oe = re.find("td").slice(0, -1), ie = oe.find("> div"), se = oe.find(".fc-day-content > div"), de = oe.eq(0), he = ie.eq(0), P(ee.add(ee.find("tr"))), P(re.add(re.find("tr")))
        }

        function h() {
            var t = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'>" + g() + p() + "</table>";
            return t
        }

        function g() {
            var t, e, n, r = Be + "-widget-header",
                a = "";
            for (a += "<thead><tr>", Je ? (e = sn(t, Ue), Pe ? e += Ve : e = Ve + e, a += "<th class='fc-agenda-axis fc-week-number " + r + "'>" + Y(e) + "</th>") : a += "<th class='fc-agenda-axis " + r + "'>&nbsp;</th>", n = 0; Ae > n; n++) t = rn(0, n), a += "<th class='fc-" + De[t.getDay()] + " fc-col" + n + " " + r + "'>" + Y(sn(t, Xe)) + "</th>";
            return a += "<th class='fc-agenda-gutter " + r + "'>&nbsp;</th>" + "</tr>" + "</thead>"
        }

        function p() {
            var t, e, n, r, a, o = Be + "-widget-header",
                i = Be + "-widget-content",
                s = f(new Date),
                l = "";
            for (l += "<tbody><tr><th class='fc-agenda-axis " + o + "'>&nbsp;</th>", n = "", e = 0; Ae > e; e++) t = rn(0, e), a = ["fc-col" + e, "fc-" + De[t.getDay()], i], +t == +s ? a.push(Be + "-state-highlight", "fc-today") : s > t ? a.push("fc-past") : a.push("fc-future"), r = "<td class='" + a.join(" ") + "'>" + "<div>" + "<div class='fc-day-content'>" + "<div style='position:relative'>&nbsp;</div>" + "</div>" + "</div>" + "</td>", n += r;
            return l += n, l += "<td class='fc-agenda-gutter " + i + "'>&nbsp;</td>" + "</tr>" + "</tbody>"
        }

        function m(t) {
            t === e && (t = xe), xe = t, ln = {};
            var n = re.position().top,
                r = be.position().top,
                a = Math.min(t - n, Me.height() + r + 1);
            he.height(a - R(de)), ge.css("top", n), be.height(a - r - 1), Re = Ee.height() + 1, ze = Ze("slotMinutes") / Ne, We = Re / ze
        }

        function b(e) {
            Se = e, qe.clear(), Ye.clear();
            var n = ee.find("th:first");
            me && (n = n.add(me.find("th:first"))), n = n.add(Me.find("th:first")), ke = 0, T(n.width("").each(function(e, n) {
                ke = Math.max(ke, t(n).outerWidth())
            }), ke);
            var r = K.find(".fc-agenda-gutter");
            me && (r = r.add(me.find("th.fc-agenda-gutter")));
            var a = be[0].clientWidth;
            Fe = be.width() - a, Fe ? (T(r, Fe), r.show().prev().removeClass("fc-last")) : r.hide().prev().addClass("fc-last"), He = Math.floor((a - ke) / Ae), T(ne.slice(0, -1), He)
        }

        function D() {
            function t() {
                be.scrollTop(r)
            }
            var e = v(),
                n = d(e);
            n.setHours(Ze("firstHour"));
            var r = _(e, n) + 1;
            t(), setTimeout(t, 0)
        }

        function w() {
            D()
        }

        function C(t) {
            t.click(E).mousedown(en)
        }

        function M(t) {
            t.click(E).mousedown(U)
        }

        function E(t) {
            if (!Ze("selectable")) {
                var e = Math.min(Ae - 1, Math.floor((t.pageX - K.offset().left - ke) / He)),
                    n = rn(0, e),
                    r = this.parentNode.className.match(/fc-slot(\d+)/);
                if (r) {
                    var a = parseInt(r[1]) * Ze("slotMinutes"),
                        o = Math.floor(a / 60);
                    n.setHours(o), n.setMinutes(a % 60 + je), Ge("dayClick", oe[e], n, !1, t)
                } else Ge("dayClick", oe[e], n, !0, t)
            }
        }

        function x(t, e, n) {
            n && Le.build();
            for (var r = on(t, e), a = 0; r.length > a; a++) {
                var o = r[a];
                C(k(o.row, o.leftCol, o.row, o.rightCol))
            }
        }

        function k(t, e, n, r) {
            var a = Le.rect(t, e, n, r, ge);
            return $e(a, ge)
        }

        function H(t, e) {
            for (var n = 0; Ae > n; n++) {
                var r = rn(0, n),
                    a = l(d(r), 1),
                    o = new Date(Math.max(r, t)),
                    i = new Date(Math.min(a, e));
                if (i > o) {
                    var s = Le.rect(0, n, 0, n, we),
                        c = _(r, o),
                        u = _(r, i);
                    s.top = c, s.height = u - c, M($e(s, we))
                }
            }
        }

        function F(t) {
            return qe.left(t)
        }

        function N(t) {
            return Ye.left(t)
        }

        function z(t) {
            return qe.right(t)
        }

        function W(t) {
            return Ye.right(t)
        }

        function A(t) {
            return Ze("allDaySlot") && !t.row
        }

        function L(t) {
            var e = rn(0, t.col),
                n = t.row;
            return Ze("allDaySlot") && n--, n >= 0 && u(e, je + n * Ne), e
        }

        function _(t, n) {
            if (t = d(t, !0), u(d(t), je) > n) return 0;
            if (n >= u(d(t), Ie)) return Me.height();
            var r = Ze("slotMinutes"),
                a = 60 * n.getHours() + n.getMinutes() - je,
                o = Math.floor(a / r),
                i = ln[o];
            return i === e && (i = ln[o] = Me.find("tr").eq(o).find("td div")[0].offsetTop), Math.max(0, Math.round(i - 1 + Re * (a % r / r)))
        }

        function q() {
            return ye
        }

        function j(t) {
            var e = d(t.start);
            return t.allDay ? e : u(e, Ze("defaultEventMinutes"))
        }

        function I(t, e) {
            return e ? d(t) : u(d(t), Ze("slotMinutes"))
        }

        function X(t, e, n) {
            n ? Ze("allDaySlot") && x(t, l(d(e), 1), !0) : J(t, e)
        }

        function J(e, n) {
            var r = Ze("selectHelper");
            if (Le.build(), r) {
                var a = an(e).col;
                if (a >= 0 && Ae > a) {
                    var o = Le.rect(0, a, 0, a, we),
                        i = _(e, e),
                        s = _(e, n);
                    if (s > i) {
                        if (o.top = i, o.height = s - i, o.left += 2, o.width -= 5, t.isFunction(r)) {
                            var l = r(e, n);
                            l && (o.position = "absolute", Te = t(l).css(o).appendTo(we))
                        } else o.isStart = !0, o.isEnd = !0, Te = t(nn({
                            title: "",
                            start: e,
                            end: n,
                            className: ["fc-select-helper"],
                            editable: !1
                        }, o)), Te.css("opacity", Ze("dragOpacity"));
                        Te && (M(Te), we.append(Te), T(Te, o.width, !0), S(Te, o.height, !0))
                    }
                }
            } else H(e, n)
        }

        function V() {
            Qe(), Te && (Te.remove(), Te = null)
        }

        function U(e) {
            if (1 == e.which && Ze("selectable")) {
                tn(e);
                var n;
                _e.start(function(t, e) {
                    if (V(), t && t.col == e.col && !A(t)) {
                        var r = L(e),
                            a = L(t);
                        n = [r, u(d(r), Ne), a, u(d(a), Ne)].sort(O), J(n[0], n[3])
                    } else n = null
                }, e), t(document).one("mouseup", function(t) {
                    _e.stop(), n && (+n[0] == +n[1] && Z(n[0], !1, t), Ke(n[0], n[3], !1, t))
                })
            }
        }

        function Z(t, e, n) {
            Ge("dayClick", oe[an(t).col], t, e, n)
        }

        function G(t, e) {
            _e.start(function(t) {
                if (Qe(), t)
                    if (A(t)) k(t.row, t.col, t.row, t.col);
                    else {
                        var e = L(t),
                            n = u(d(e), Ze("defaultEventMinutes"));
                        H(e, n)
                    }
            }, e)
        }

        function $(t, e, n) {
            var r = _e.stop();
            Qe(), r && Ge("drop", t, L(r), A(r), e, n)
        }
        var Q = this;
        Q.renderAgenda = o, Q.setWidth = b, Q.setHeight = m, Q.afterRender = w, Q.defaultEventEnd = j, Q.timePosition = _, Q.getIsCellAllDay = A, Q.allDayRow = q, Q.getCoordinateGrid = function() {
            return Le
        }, Q.getHoverListener = function() {
            return _e
        }, Q.colLeft = F, Q.colRight = z, Q.colContentLeft = N, Q.colContentRight = W, Q.getDaySegmentContainer = function() {
            return pe
        }, Q.getSlotSegmentContainer = function() {
            return Ce
        }, Q.getMinMinute = function() {
            return je
        }, Q.getMaxMinute = function() {
            return Ie
        }, Q.getSlotContainer = function() {
            return we
        }, Q.getRowCnt = function() {
            return 1
        }, Q.getColCnt = function() {
            return Ae
        }, Q.getColWidth = function() {
            return He
        }, Q.getSnapHeight = function() {
            return We
        }, Q.getSnapMinutes = function() {
            return Ne
        }, Q.defaultSelectionEnd = I, Q.renderDayOverlay = x, Q.renderSelection = X, Q.clearSelection = V, Q.reportDayClick = Z, Q.dragStart = G, Q.dragStop = $, ae.call(Q, n, r, a), ce.call(Q), le.call(Q), te.call(Q);
        var K, ee, ne, re, oe, ie, se, de, he, ge, pe, me, ye, be, we, Ce, Me, Ee, Te, Se, xe, ke, He, Fe, Re, Ne, ze, We, Ae, Oe, Le, _e, qe, Ye, Be, Pe, je, Ie, Xe, Je, Ve, Ue, Ze = Q.opt,
            Ge = Q.trigger,
            $e = Q.renderOverlay,
            Qe = Q.clearOverlays,
            Ke = Q.reportSelection,
            tn = Q.unselect,
            en = Q.daySelectionMousedown,
            nn = Q.slotSegHtml,
            rn = Q.cellToDate,
            an = Q.dateToCell,
            on = Q.rangeToSegments,
            sn = r.formatDate,
            ln = {};
        B(n.addClass("fc-agenda")), Le = new ue(function(e, n) {
            function r(t) {
                return Math.max(l, Math.min(c, t))
            }
            var a, o, i;
            ne.each(function(e, r) {
                a = t(r), o = a.offset().left, e && (i[1] = o), i = [o], n[e] = i
            }), i[1] = o + a.outerWidth(), Ze("allDaySlot") && (a = ye, o = a.offset().top, e[0] = [o, o + a.outerHeight()]);
            for (var s = we.offset().top, l = be.offset().top, c = l + be.outerHeight(), u = 0; Oe * ze > u; u++) e.push([r(s + We * u), r(s + We * (u + 1))])
        }), _e = new fe(Le), qe = new ve(function(t) {
            return ie.eq(t)
        }), Ye = new ve(function(t) {
            return se.eq(t)
        })
    }

    function te() {
        function n(t, e) {
            var n, r = t.length,
                o = [],
                i = [];
            for (n = 0; r > n; n++) t[n].allDay ? o.push(t[n]) : i.push(t[n]);
            y("allDaySlot") && (re(o, e), k()), s(a(i), e)
        }

        function r() {
            H().empty(), F().empty()
        }

        function a(e) {
            var n, r, a, s, l, c, f, v = P(),
                h = W(),
                g = z(),
                p = t.map(e, i),
                m = [];
            for (r = 0; v > r; r++)
                for (n = q(0, r), u(n, h), a = ee(o(e, p, n, u(d(n), g - h))), ne(a), s = 0; a.length > s; s++)
                    for (l = a[s], c = 0; l.length > c; c++) f = l[c], f.col = r, f.level = s, m.push(f);
            return m
        }

        function o(t, e, n, r) {
            var a, o, i, s, l, c, u, f, v = [],
                h = t.length;
            for (a = 0; h > a; a++) o = t[a], i = o.start, s = e[a], s > n && r > i && (n > i ? (l = d(n), u = !1) : (l = i, u = !0), s > r ? (c = d(r), f = !1) : (c = s, f = !0), v.push({
                event: o,
                start: l,
                end: c,
                isStart: u,
                isEnd: f,
                msLength: c - l
            }));
            return v.sort(B)
        }

        function i(t) {
            return t.end ? d(t.end) : u(d(t.start), y("defaultEventMinutes"))
        }

        function s(n, r) {
            var a, o, i, s, l, u, d, v, h, g, p, m, D, w, C, M, T, S, k, H = n.length,
                N = "",
                z = F();
            for (k = (S = y("isRTL")) ? -1 : 1, a = 0; H > a; a++) o = n[a], i = o.event, s = A(o.start, o.start), l = A(o.start, o.end), u = o.col, d = o.level, v = o.forward || 0, h = L(u), g = _(u) - h, g = Math.min(g - 6, .95 * g), p = d ? g / (d + v + 1) : v ? 2 * (g / (v + 1) - 6) : g, m = h + g / (d + v + 1) * d * k + (S ? g - p : 0), o.top = s, o.left = m, o.outerWidth = p, o.outerHeight = l - s, N += c(i, o);
            for (z[0].innerHTML = N, D = z.children(), a = 0; H > a; a++) o = n[a], i = o.event, w = t(D[a]), C = b("eventRender", i, i, w), C === !1 ? w.remove() : (C && C !== !0 && (w.remove(), w = t(C).css({
                position: "absolute",
                top: o.top,
                left: o.left
            }).appendTo(z)), o.element = w, i._id === r ? f(i, w, o) : w[0]._fci = a, U(i, w));
            for (E(z, n, f), a = 0; H > a; a++) o = n[a], (w = o.element) && (o.vsides = R(w, !0), o.hsides = x(w, !0), M = w.find(".fc-event-title"), M.length && (o.contentTop = M[0].offsetTop));
            for (a = 0; H > a; a++) o = n[a], (w = o.element) && (w[0].style.width = Math.max(0, o.outerWidth - o.hsides) + "px", T = Math.max(0, o.outerHeight - o.vsides), w[0].style.height = T + "px", i = o.event, o.contentTop !== e && 10 > T - o.contentTop && (w.find("div.fc-event-time").text(ie(i.start, y("timeFormat")) + " - " + i.title), w.find("div.fc-event-title").remove()), b("eventAfterRender", i, i, w))
        }

        function c(t, e) {
            var n = "<",
                r = t.url,
                a = j(t, y),
                o = ["fc-event", "fc-event-vert"];
            return D(t) && o.push("fc-event-draggable"), e.isStart && o.push("fc-event-start"), e.isEnd && o.push("fc-event-end"), o = o.concat(t.className), t.source && (o = o.concat(t.source.className || [])), n += r ? "a href='" + Y(t.url) + "'" : "div", n += " class='" + o.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "top:" + e.top + "px;" + "left:" + e.left + "px;" + a + "'" + ">" + "<div class='fc-event-inner'>" + "<div class='fc-event-time'>" + Y(se(t.start, t.end, y("timeFormat"))) + "</div>" + "<div class='fc-event-title'>" + Y(t.title || "") + "</div>" + "</div>" + "<div class='fc-event-bg'></div>", e.isEnd && w(t) && (n += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"), n += "</" + (r ? "a" : "div") + ">"
        }

        function f(t, e, n) {
            var r = e.find("div.fc-event-time");
            D(t) && g(t, e, r), n.isEnd && w(t) && p(t, e, r), T(t, e)
        }

        function v(t, e, n) {
            function r() {
                c || (e.width(a).height("").draggable("option", "grid", null), c = !0)
            }
            var a, o, i, s = n.isStart,
                c = !0,
                u = N(),
                f = I(),
                v = X(),
                g = J(),
                p = W();
            e.draggable({
                opacity: y("dragOpacity", "month"),
                revertDuration: y("dragRevertDuration"),
                start: function(n, p) {
                    b("eventDragStart", e, t, n, p), G(t, e), a = e.width(), u.start(function(n, a) {
                        if (te(), n) {
                            o = !1;
                            var u = q(0, a.col),
                                p = q(0, n.col);
                            i = h(p, u), n.row ? s ? c && (e.width(f - 10), S(e, v * Math.round((t.end ? (t.end - t.start) / Me : y("defaultEventMinutes")) / g)), e.draggable("option", "grid", [f, 1]), c = !1) : o = !0 : (K(l(d(t.start), i), l(C(t), i)), r()), o = o || c && !i
                        } else r(), o = !0;
                        e.draggable("option", "revert", o)
                    }, n, "drag")
                },
                stop: function(n, a) {
                    if (u.stop(), te(), b("eventDragStop", e, t, n, a), o) r(), e.css("filter", ""), Z(t, e);
                    else {
                        var s = 0;
                        c || (s = Math.round((e.offset().top - V().offset().top) / v) * g + p - (60 * t.start.getHours() + t.start.getMinutes())), $(this, t, i, s, c, n, a)
                    }
                }
            })
        }

        function g(t, e, n) {
            function r() {
                te(), s && (f ? (n.hide(), e.draggable("option", "grid", null), K(l(d(t.start), D), l(C(t), D))) : (a(w), n.css("display", ""), e.draggable("option", "grid", [S, x])))
            }

            function a(e) {
                var r, a = u(d(t.start), e);
                t.end && (r = u(d(t.end), e)), n.text(se(a, r, y("timeFormat")))
            }
            var o, i, s, c, f, v, g, p, D, w, M, E = m.getCoordinateGrid(),
                T = P(),
                S = I(),
                x = X(),
                k = J();
            e.draggable({
                scroll: !1,
                grid: [S, x],
                axis: 1 == T ? "y" : !1,
                opacity: y("dragOpacity"),
                revertDuration: y("dragRevertDuration"),
                start: function(n, r) {
                    b("eventDragStart", e, t, n, r), G(t, e), E.build(), o = e.position(), i = E.cell(n.pageX, n.pageY), s = c = !0, f = v = O(i), g = p = 0, D = 0, w = M = 0
                },
                drag: function(t, n) {
                    var a = E.cell(t.pageX, t.pageY);
                    if (s = !! a) {
                        if (f = O(a), g = Math.round((n.position.left - o.left) / S), g != p) {
                            var l = q(0, i.col),
                                u = i.col + g;
                            u = Math.max(0, u), u = Math.min(T - 1, u);
                            var d = q(0, u);
                            D = h(d, l)
                        }
                        f || (w = Math.round((n.position.top - o.top) / x) * k)
                    }(s != c || f != v || g != p || w != M) && (r(), c = s, v = f, p = g, M = w), e.draggable("option", "revert", !s)
                },
                stop: function(n, a) {
                    te(), b("eventDragStop", e, t, n, a), s && (f || D || w) ? $(this, t, D, f ? 0 : w, f, n, a) : (s = !0, f = !1, g = 0, D = 0, w = 0, r(), e.css("filter", ""), e.css(o), Z(t, e))
                }
            })
        }

        function p(t, e, n) {
            var r, a, o = X(),
                i = J();
            e.resizable({
                handles: {
                    s: ".ui-resizable-handle"
                },
                grid: o,
                start: function(n, o) {
                    r = a = 0, G(t, e), b("eventResizeStart", this, t, n, o)
                },
                resize: function(s, l) {
                    r = Math.round((Math.max(o, e.height()) - l.originalSize.height) / o), r != a && (n.text(se(t.start, r || t.end ? u(M(t), i * r) : null, y("timeFormat"))), a = r)
                },
                stop: function(n, a) {
                    b("eventResizeStop", this, t, n, a), r ? Q(this, t, 0, i * r, n, a) : Z(t, e)
                }
            })
        }
        var m = this;
        m.renderEvents = n, m.clearEvents = r, m.slotSegHtml = c, oe.call(m);
        var y = m.opt,
            b = m.trigger,
            D = m.isEventDraggable,
            w = m.isEventResizable,
            M = m.eventEnd,
            T = m.eventElementHandlers,
            k = m.setHeight,
            H = m.getDaySegmentContainer,
            F = m.getSlotSegmentContainer,
            N = m.getHoverListener,
            z = m.getMaxMinute,
            W = m.getMinMinute,
            A = m.timePosition,
            O = m.getIsCellAllDay,
            L = m.colContentLeft,
            _ = m.colContentRight,
            q = m.cellToDate,
            B = m.segmentCompare,
            P = m.getColCnt,
            I = m.getColWidth,
            X = m.getSnapHeight,
            J = m.getSnapMinutes,
            V = m.getSlotContainer,
            U = m.reportEventElement,
            Z = m.showEvents,
            G = m.hideEvents,
            $ = m.eventDrop,
            Q = m.eventResize,
            K = m.renderDayOverlay,
            te = m.clearOverlays,
            re = m.renderDayEvents,
            ae = m.calendar,
            ie = ae.formatDate,
            se = ae.formatDates;
        m.draggableDayEvent = v
    }

    function ee(t) {
        var e, n, r, a, o, i = [],
            s = t.length;
        for (e = 0; s > e; e++) {
            for (n = t[e], r = 0;;) {
                if (a = !1, i[r])
                    for (o = 0; i[r].length > o; o++)
                        if (re(i[r][o], n)) {
                            a = !0;
                            break
                        }
                if (!a) break;
                r++
            }
            i[r] ? i[r].push(n) : i[r] = [n]
        }
        return i
    }

    function ne(t) {
        var e, n, r, a, o, i;
        for (e = t.length - 1; e > 0; e--)
            for (a = t[e], n = 0; a.length > n; n++)
                for (o = a[n], r = 0; t[e - 1].length > r; r++) i = t[e - 1][r], re(o, i) && (i.forward = Math.max(i.forward || 0, (o.forward || 0) + 1))
    }

    function re(t, e) {
        return t.end > e.start && t.start < e.end
    }

    function ae(n, r, a) {
        function o(e, n) {
            var r = Z[e];
            return t.isPlainObject(r) ? q(r, n || a) : r
        }

        function i(t, e) {
            return r.trigger.apply(r, [t, e || B].concat(Array.prototype.slice.call(arguments, 2), [B]))
        }

        function s(t) {
            var e = t.source || {};
            return X(t.startEditable, e.startEditable, o("eventStartEditable"), t.editable, e.editable, o("editable")) && !o("disableDragging")
        }

        function c(t) {
            var e = t.source || {};
            return X(t.durationEditable, e.durationEditable, o("eventDurationEditable"), t.editable, e.editable, o("editable")) && !o("disableResizing")
        }

        function f(t) {
            J = {};
            var e, n, r = t.length;
            for (e = 0; r > e; e++) n = t[e], J[n._id] ? J[n._id].push(n) : J[n._id] = [n]
        }

        function v() {
            J = {}, V = {}, U = []
        }

        function g(t) {
            return t.end ? d(t.end) : P(t)
        }

        function p(t, e) {
            U.push({
                event: t,
                element: e
            }), V[t._id] ? V[t._id].push(e) : V[t._id] = [e]
        }

        function m() {
            t.each(U, function(t, e) {
                B.trigger("eventDestroy", e.event, e.event, e.element)
            })
        }

        function y(t, n) {
            n.click(function(r) {
                return n.hasClass("ui-draggable-dragging") || n.hasClass("ui-resizable-resizing") ? e : i("eventClick", this, t, r)
            }).hover(function(e) {
                i("eventMouseover", this, t, e)
            }, function(e) {
                i("eventMouseout", this, t, e)
            })
        }

        function b(t, e) {
            w(t, e, "show")
        }

        function D(t, e) {
            w(t, e, "hide")
        }

        function w(t, e, n) {
            var r, a = V[t._id],
                o = a.length;
            for (r = 0; o > r; r++) e && a[r][0] == e[0] || a[r][n]()
        }

        function C(t, e, n, r, a, o, s) {
            var l = e.allDay,
                c = e._id;
            E(J[c], n, r, a), i("eventDrop", t, e, n, r, a, function() {
                E(J[c], -n, -r, l), I(c)
            }, o, s), I(c)
        }

        function M(t, e, n, r, a, o) {
            var s = e._id;
            T(J[s], n, r), i("eventResize", t, e, n, r, function() {
                T(J[s], -n, -r), I(s)
            }, a, o), I(s)
        }

        function E(t, n, r, a) {
            r = r || 0;
            for (var o, i = t.length, s = 0; i > s; s++) o = t[s], a !== e && (o.allDay = a), u(l(o.start, n, !0), r), o.end && (o.end = u(l(o.end, n, !0), r)), j(o, Z)
        }

        function T(t, e, n) {
            n = n || 0;
            for (var r, a = t.length, o = 0; a > o; o++) r = t[o], r.end = u(l(g(r), e, !0), n), j(r, Z)
        }

        function S(t) {
            return "object" == typeof t && (t = t.getDay()), Q[t]
        }

        function x() {
            return G
        }

        function k(t, e, n) {
            for (e = e || 1; Q[(t.getDay() + (n ? e : 0) + 7) % 7];) l(t, e)
        }

        function H() {
            var t = F.apply(null, arguments),
                e = R(t),
                n = N(e);
            return n
        }

        function F(t, e) {
            var n = B.getColCnt(),
                r = ee ? -1 : 1,
                a = ee ? n - 1 : 0;
            "object" == typeof t && (e = t.col, t = t.row);
            var o = t * n + (e * r + a);
            return o
        }

        function R(t) {
            var e = B.visStart.getDay();
            return t += K[e], 7 * Math.floor(t / G) + te[(t % G + G) % G] - e
        }

        function N(t) {
            var e = d(B.visStart);
            return l(e, t), e
        }

        function z(t) {
            var e = W(t),
                n = A(e),
                r = O(n);
            return r
        }

        function W(t) {
            return h(t, B.visStart)
        }

        function A(t) {
            var e = B.visStart.getDay();
            return t += e, Math.floor(t / 7) * G + K[(t % 7 + 7) % 7] - K[e]
        }

        function O(t) {
            var e = B.getColCnt(),
                n = ee ? -1 : 1,
                r = ee ? e - 1 : 0,
                a = Math.floor(t / e),
                o = (t % e + e) % e * n + r;
            return {
                row: a,
                col: o
            }
        }

        function L(t, e) {
            for (var n = B.getRowCnt(), r = B.getColCnt(), a = [], o = W(t), i = W(e), s = A(o), l = A(i) - 1, c = 0; n > c; c++) {
                var u = c * r,
                    f = u + r - 1,
                    d = Math.max(s, u),
                    v = Math.min(l, f);
                if (v >= d) {
                    var h = O(d),
                        g = O(v),
                        p = [h.col, g.col].sort(),
                        m = R(d) == o,
                        y = R(v) + 1 == i;
                    a.push({
                        row: c,
                        leftCol: p[0],
                        rightCol: p[1],
                        isStart: m,
                        isEnd: y
                    })
                }
            }
            return a
        }

        function _(t, e) {
            return Y(t, e) || t.event.start - e.event.start || (t.event.title || "").localeCompare(e.event.title)
        }

        function Y(t, e) {
            return "msLength" in t ? e.msLength - t.msLength : e.rightCol - e.leftCol - (t.rightCol - t.leftCol) || e.event.allDay - t.event.allDay
        }
        var B = this;
        B.element = n, B.calendar = r, B.name = a, B.opt = o, B.trigger = i, B.isEventDraggable = s, B.isEventResizable = c, B.setEventData = f, B.clearEventData = v, B.eventEnd = g, B.reportEventElement = p, B.triggerEventDestroy = m, B.eventElementHandlers = y, B.showEvents = b, B.hideEvents = D, B.eventDrop = C, B.eventResize = M;
        var P = B.defaultEventEnd,
            j = r.normalizeEvent,
            I = r.reportEventChange,
            J = {}, V = {}, U = [],
            Z = r.options;
        B.isHiddenDay = S, B.skipHiddenDays = k, B.getCellsPerWeek = x, B.dateToCell = z, B.dateToDayOffset = W, B.dayOffsetToCellOffset = A, B.cellOffsetToCell = O, B.cellToDate = H, B.cellToCellOffset = F, B.cellOffsetToDayOffset = R, B.dayOffsetToDate = N, B.rangeToSegments = L, B.segmentCompare = _;
        var G, $ = o("hiddenDays") || [],
            Q = [],
            K = [],
            te = [],
            ee = o("isRTL");
        (function() {
            o("weekends") === !1 && $.push(0, 6);
            for (var e = 0, n = 0; 7 > e; e++) K[e] = n, Q[e] = -1 != t.inArray(e, $), Q[e] || (te[n] = e, n++);
            if (G = n, !G) throw "invalid hiddenDays"
        })()
    }

    function oe() {
        function e(t, e) {
            var n = r(t, !1, !0);
            se(n, function(t, e) {
                N(t.event, e)
            }), b(n, e), se(n, function(t, e) {
                k("eventAfterRender", t.event, t.event, e)
            })
        }

        function n(t, e, n) {
            var a = r([t], !0, !1),
                o = [];
            return se(a, function(t, r) {
                t.row === e && r.css("top", n), o.push(r[0])
            }), o
        }

        function r(e, n, r) {
            var o, l, c = Z(),
                d = n ? t("<div/>") : c,
                v = a(e);
            return i(v), o = s(v), d[0].innerHTML = o, l = d.children(), n && c.append(l), u(v, l), se(v, function(t, e) {
                t.hsides = x(e, !0)
            }), se(v, function(t, e) {
                e.width(Math.max(0, t.outerWidth - t.hsides))
            }), se(v, function(t, e) {
                t.outerHeight = e.outerHeight(!0)
            }), f(v, r), v
        }

        function a(t) {
            for (var e = [], n = 0; t.length > n; n++) {
                var r = o(t[n]);
                e.push.apply(e, r)
            }
            return e
        }

        function o(t) {
            for (var e = t.start, n = C(t), r = ee(e, n), a = 0; r.length > a; a++) r[a].event = t;
            return r
        }

        function i(t) {
            for (var e = S("isRTL"), n = 0; t.length > n; n++) {
                var r = t[n],
                    a = (e ? r.isEnd : r.isStart) ? V : X,
                    o = (e ? r.isStart : r.isEnd) ? U : J,
                    i = a(r.leftCol),
                    s = o(r.rightCol);
                r.left = i, r.outerWidth = s - i
            }
        }

        function s(t) {
            for (var e = "", n = 0; t.length > n; n++) e += c(t[n]);
            return e
        }

        function c(t) {
            var e = "",
                n = S("isRTL"),
                r = t.event,
                a = r.url,
                o = ["fc-event", "fc-event-hori"];
            H(r) && o.push("fc-event-draggable"), t.isStart && o.push("fc-event-start"), t.isEnd && o.push("fc-event-end"), o = o.concat(r.className), r.source && (o = o.concat(r.source.className || []));
            var i = j(r, S);
            return e += a ? "<a href='" + Y(a) + "'" : "<div", e += " class='" + o.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "left:" + t.left + "px;" + i + "'" + ">" + "<div class='fc-event-inner'>", !r.allDay && t.isStart && (e += "<span class='fc-event-time'>" + Y(G(r.start, r.end, S("timeFormat"))) + "</span>"), e += "<span class='fc-event-title'>" + Y(r.title || "") + "</span>" + "</div>", t.isEnd && F(r) && (e += "<div class='ui-resizable-handle ui-resizable-" + (n ? "w" : "e") + "'>" + "&nbsp;&nbsp;&nbsp;" + "</div>"), e += "</" + (a ? "a" : "div") + ">"
        }

        function u(e, n) {
            for (var r = 0; e.length > r; r++) {
                var a = e[r],
                    o = a.event,
                    i = n.eq(r),
                    s = k("eventRender", o, o, i);
                s === !1 ? i.remove() : (s && s !== !0 && (s = t(s).css({
                    position: "absolute",
                    left: a.left
                }), i.replaceWith(s), i = s), a.element = i)
            }
        }

        function f(t, e) {
            var n = v(t),
                r = y(),
                a = [];
            if (e)
                for (var o = 0; r.length > o; o++) r[o].height(n[o]);
            for (var o = 0; r.length > o; o++) a.push(r[o].position().top);
            se(t, function(t, e) {
                e.css("top", a[t.row] + t.top)
            })
        }

        function v(t) {
            for (var e = q(), n = P(), r = [], a = g(t), o = 0; e > o; o++) {
                for (var i = a[o], s = [], l = 0; n > l; l++) s.push(0);
                for (var c = 0; i.length > c; c++) {
                    var u = i[c];
                    u.top = L(s.slice(u.leftCol, u.rightCol + 1));
                    for (var l = u.leftCol; u.rightCol >= l; l++) s[l] = u.top + u.outerHeight
                }
                r.push(L(s))
            }
            return r
        }

        function g(t) {
            var e, n, r, a = q(),
                o = [];
            for (e = 0; t.length > e; e++) n = t[e], r = n.row, n.element && (o[r] ? o[r].push(n) : o[r] = [n]);
            for (r = 0; a > r; r++) o[r] = p(o[r] || []);
            return o
        }

        function p(t) {
            for (var e = [], n = m(t), r = 0; n.length > r; r++) e.push.apply(e, n[r]);
            return e
        }

        function m(t) {
            t.sort(ne);
            for (var e = [], n = 0; t.length > n; n++) {
                for (var r = t[n], a = 0; e.length > a && ie(r, e[a]); a++);
                e[a] ? e[a].push(r) : e[a] = [r]
            }
            return e
        }

        function y() {
            var t, e = q(),
                n = [];
            for (t = 0; e > t; t++) n[t] = I(t).find("div.fc-day-content > div");
            return n
        }

        function b(t, e) {
            var n = Z();
            se(t, function(t, n, r) {
                var a = t.event;
                a._id === e ? D(a, n, t) : n[0]._fci = r
            }), E(n, t, D)
        }

        function D(t, e, n) {
            H(t) && T.draggableDayEvent(t, e, n), n.isEnd && F(t) && T.resizableDayEvent(t, e, n), z(t, e)
        }

        function w(t, e) {
            var n, r = te();
            e.draggable({
                delay: 50,
                opacity: S("dragOpacity"),
                revertDuration: S("dragRevertDuration"),
                start: function(a, o) {
                    k("eventDragStart", e, t, a, o), A(t, e), r.start(function(r, a, o, i) {
                        if (e.draggable("option", "revert", !r || !o && !i), Q(), r) {
                            var s = re(a),
                                c = re(r);
                            n = h(c, s), $(l(d(t.start), n), l(C(t), n))
                        } else n = 0
                    }, a, "drag")
                },
                stop: function(a, o) {
                    r.stop(), Q(), k("eventDragStop", e, t, a, o), n ? O(this, t, n, 0, t.allDay, a, o) : (e.css("filter", ""), W(t, e))
                }
            })
        }

        function M(e, r, a) {
            var o = S("isRTL"),
                i = o ? "w" : "e",
                s = r.find(".ui-resizable-" + i),
                c = !1;
            B(r), r.mousedown(function(t) {
                t.preventDefault()
            }).click(function(t) {
                c && (t.preventDefault(), t.stopImmediatePropagation())
            }), s.mousedown(function(o) {
                function s(n) {
                    k("eventResizeStop", this, e, n), t("body").css("cursor", ""), u.stop(), Q(), f && _(this, e, f, 0, n), setTimeout(function() {
                        c = !1
                    }, 0)
                }
                if (1 == o.which) {
                    c = !0;
                    var u = te();
                    q(), P();
                    var f, d, v = r.css("top"),
                        h = t.extend({}, e),
                        g = ce(le(e.start));
                    K(), t("body").css("cursor", i + "-resize").one("mouseup", s), k("eventResizeStart", this, e, o), u.start(function(r, o) {
                        if (r) {
                            var s = ae(o),
                                c = ae(r);
                            if (c = Math.max(c, g), f = oe(c) - oe(s)) {
                                h.end = l(R(e), f, !0);
                                var u = d;
                                d = n(h, a.row, v), d = t(d), d.find("*").css("cursor", i + "-resize"), u && u.remove(), A(e)
                            } else d && (W(e), d.remove(), d = null);
                            Q(), $(e.start, l(C(e), f))
                        }
                    }, o)
                }
            })
        }
        var T = this;
        T.renderDayEvents = e, T.draggableDayEvent = w, T.resizableDayEvent = M;
        var S = T.opt,
            k = T.trigger,
            H = T.isEventDraggable,
            F = T.isEventResizable,
            R = T.eventEnd,
            N = T.reportEventElement,
            z = T.eventElementHandlers,
            W = T.showEvents,
            A = T.hideEvents,
            O = T.eventDrop,
            _ = T.eventResize,
            q = T.getRowCnt,
            P = T.getColCnt;
        T.getColWidth;
        var I = T.allDayRow,
            X = T.colLeft,
            J = T.colRight,
            V = T.colContentLeft,
            U = T.colContentRight;
        T.dateToCell;
        var Z = T.getDaySegmentContainer,
            G = T.calendar.formatDates,
            $ = T.renderDayOverlay,
            Q = T.clearOverlays,
            K = T.clearSelection,
            te = T.getHoverListener,
            ee = T.rangeToSegments,
            ne = T.segmentCompare,
            re = T.cellToDate,
            ae = T.cellToCellOffset,
            oe = T.cellOffsetToDayOffset,
            le = T.dateToDayOffset,
            ce = T.dayOffsetToCellOffset
    }

    function ie(t, e) {
        for (var n = 0; e.length > n; n++) {
            var r = e[n];
            if (r.leftCol <= t.rightCol && r.rightCol >= t.leftCol) return !0
        }
        return !1
    }

    function se(t, e) {
        for (var n = 0; t.length > n; n++) {
            var r = t[n],
                a = r.element;
            a && e(r, a, n)
        }
    }

    function le() {
        function e(t, e, a) {
            n(), e || (e = l(t, a)), c(t, e, a), r(t, e, a)
        }

        function n(t) {
            f && (f = !1, u(), s("unselect", null, t))
        }

        function r(t, e, n, r) {
            f = !0, s("select", null, t, e, n, r)
        }

        function a(e) {
            var a = o.cellToDate,
                s = o.getIsCellAllDay,
                l = o.getHoverListener(),
                f = o.reportDayClick;
            if (1 == e.which && i("selectable")) {
                n(e);
                var d;
                l.start(function(t, e) {
                    u(), t && s(t) ? (d = [a(e), a(t)].sort(O), c(d[0], d[1], !0)) : d = null
                }, e), t(document).one("mouseup", function(t) {
                    l.stop(), d && (+d[0] == +d[1] && f(d[0], !0, t), r(d[0], d[1], !0, t))
                })
            }
        }
        var o = this;
        o.select = e, o.unselect = n, o.reportSelection = r, o.daySelectionMousedown = a;
        var i = o.opt,
            s = o.trigger,
            l = o.defaultSelectionEnd,
            c = o.renderSelection,
            u = o.clearSelection,
            f = !1;
        i("selectable") && i("unselectAuto") && t(document).mousedown(function(e) {
            var r = i("unselectCancel");
            r && t(e.target).parents(r).length || n(e)
        })
    }

    function ce() {
        function e(e, n) {
            var r = o.shift();
            return r || (r = t("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")), r[0].parentNode != n[0] && r.appendTo(n), a.push(r.css(e).show()), r
        }

        function n() {
            for (var t; t = a.shift();) o.push(t.hide().unbind())
        }
        var r = this;
        r.renderOverlay = e, r.clearOverlays = n;
        var a = [],
            o = []
    }

    function ue(t) {
        var e, n, r = this;
        r.build = function() {
            e = [], n = [], t(e, n)
        }, r.cell = function(t, r) {
            var a, o = e.length,
                i = n.length,
                s = -1,
                l = -1;
            for (a = 0; o > a; a++)
                if (r >= e[a][0] && e[a][1] > r) {
                    s = a;
                    break
                }
            for (a = 0; i > a; a++)
                if (t >= n[a][0] && n[a][1] > t) {
                    l = a;
                    break
                }
            return s >= 0 && l >= 0 ? {
                row: s,
                col: l
            } : null
        }, r.rect = function(t, r, a, o, i) {
            var s = i.offset();
            return {
                top: e[t][0] - s.top,
                left: n[r][0] - s.left,
                width: n[o][1] - n[r][0],
                height: e[a][1] - e[t][0]
            }
        }
    }

    function fe(e) {
        function n(t) {
            de(t);
            var n = e.cell(t.pageX, t.pageY);
            (!n != !i || n && (n.row != i.row || n.col != i.col)) && (n ? (o || (o = n), a(n, o, n.row - o.row, n.col - o.col)) : a(n, o), i = n)
        }
        var r, a, o, i, s = this;
        s.start = function(s, l, c) {
            a = s, o = i = null, e.build(), n(l), r = c || "mousemove", t(document).bind(r, n)
        }, s.stop = function() {
            return t(document).unbind(r, n), i
        }
    }

    function de(t) {
        t.pageX === e && (t.pageX = t.originalEvent.pageX, t.pageY = t.originalEvent.pageY)
    }

    function ve(t) {
        function n(e) {
            return a[e] = a[e] || t(e)
        }
        var r = this,
            a = {}, o = {}, i = {};
        r.left = function(t) {
            return o[t] = o[t] === e ? n(t).position().left : o[t]
        }, r.right = function(t) {
            return i[t] = i[t] === e ? r.left(t) + n(t).width() : i[t]
        }, r.clear = function() {
            a = {}, o = {}, i = {}
        }
    }
    var he = {
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberCalculation: "iso",
        weekNumberTitle: "W",
        allDayDefault: !0,
        ignoreTimezone: !0,
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        titleFormat: {
            month: "MMMM yyyy",
            week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
            day: "dddd, MMM d, yyyy"
        },
        columnFormat: {
            month: "ddd",
            week: "ddd M/d",
            day: "dddd M/d"
        },
        timeFormat: {
            "": "h(:mm)t"
        },
        isRTL: !1,
        firstDay: 0,
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        buttonText: {
            prev: "<span class='fc-text-arrow'>&lsaquo;</span>",
            next: "<span class='fc-text-arrow'>&rsaquo;</span>",
            prevYear: "<span class='fc-text-arrow'>&laquo;</span>",
            nextYear: "<span class='fc-text-arrow'>&raquo;</span>",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        theme: !1,
        buttonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e"
        },
        unselectAuto: !0,
        dropAccept: "*",
        handleWindowResize: !0
    }, ge = {
            header: {
                left: "next,prev today",
                center: "",
                right: "title"
            },
            buttonText: {
                prev: "<span class='fc-text-arrow'>&rsaquo;</span>",
                next: "<span class='fc-text-arrow'>&lsaquo;</span>",
                prevYear: "<span class='fc-text-arrow'>&raquo;</span>",
                nextYear: "<span class='fc-text-arrow'>&laquo;</span>"
            },
            buttonIcons: {
                prev: "circle-triangle-e",
                next: "circle-triangle-w"
            }
        }, pe = t.fullCalendar = {
            version: "1.6.3"
        }, me = pe.views = {};
    t.fn.fullCalendar = function(n) {
        if ("string" == typeof n) {
            var a, o = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var r = t.data(this, "fullCalendar");
                if (r && t.isFunction(r[n])) {
                    var i = r[n].apply(r, o);
                    a === e && (a = i), "destroy" == n && t.removeData(this, "fullCalendar")
                }
            }), a !== e ? a : this
        }
        var i = n.eventSources || [];
        return delete n.eventSources, n.events && (i.push(n.events), delete n.events), n = t.extend(!0, {}, he, n.isRTL || n.isRTL === e && he.isRTL ? ge : {}, n), this.each(function(e, a) {
            var o = t(a),
                s = new r(o, n, i);
            o.data("fullCalendar", s), s.render()
        }), this
    }, pe.sourceNormalizers = [], pe.sourceFetchers = [];
    var ye = {
        dataType: "json",
        cache: !1
    }, be = 1;
    pe.addDays = l, pe.cloneDate = d, pe.parseDate = p, pe.parseISO8601 = m, pe.parseTime = y, pe.formatDate = b, pe.formatDates = D;
    var De = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        we = 864e5,
        Ce = 36e5,
        Me = 6e4,
        Ee = {
            s: function(t) {
                return t.getSeconds()
            },
            ss: function(t) {
                return _(t.getSeconds())
            },
            m: function(t) {
                return t.getMinutes()
            },
            mm: function(t) {
                return _(t.getMinutes())
            },
            h: function(t) {
                return t.getHours() % 12 || 12
            },
            hh: function(t) {
                return _(t.getHours() % 12 || 12)
            },
            H: function(t) {
                return t.getHours()
            },
            HH: function(t) {
                return _(t.getHours())
            },
            d: function(t) {
                return t.getDate()
            },
            dd: function(t) {
                return _(t.getDate())
            },
            ddd: function(t, e) {
                return e.dayNamesShort[t.getDay()]
            },
            dddd: function(t, e) {
                return e.dayNames[t.getDay()]
            },
            M: function(t) {
                return t.getMonth() + 1
            },
            MM: function(t) {
                return _(t.getMonth() + 1)
            },
            MMM: function(t, e) {
                return e.monthNamesShort[t.getMonth()]
            },
            MMMM: function(t, e) {
                return e.monthNames[t.getMonth()]
            },
            yy: function(t) {
                return (t.getFullYear() + "").substring(2)
            },
            yyyy: function(t) {
                return t.getFullYear()
            },
            t: function(t) {
                return 12 > t.getHours() ? "a" : "p"
            },
            tt: function(t) {
                return 12 > t.getHours() ? "am" : "pm"
            },
            T: function(t) {
                return 12 > t.getHours() ? "A" : "P"
            },
            TT: function(t) {
                return 12 > t.getHours() ? "AM" : "PM"
            },
            u: function(t) {
                return b(t, "yyyy-MM-dd'T'HH:mm:ss'Z'")
            },
            S: function(t) {
                var e = t.getDate();
                return e > 10 && 20 > e ? "th" : ["st", "nd", "rd"][e % 10 - 1] || "th"
            },
            w: function(t, e) {
                return e.weekNumberCalculation(t)
            },
            W: function(t) {
                return w(t)
            }
        };
    pe.dateFormatters = Ee, pe.applyAll = I, me.month = J, me.basicWeek = V, me.basicDay = U, n({
        weekMode: "fixed"
    }), me.agendaWeek = $, me.agendaDay = Q, n({
        allDaySlot: !0,
        allDayText: "all-day",
        firstHour: 6,
        slotMinutes: 30,
        defaultEventMinutes: 120,
        axisFormat: "h(:mm)tt",
        timeFormat: {
            agenda: "h:mm{ - h:mm}"
        },
        dragOpacity: {
            agenda: .5
        },
        minTime: 0,
        maxTime: 24
    })
})(jQuery);