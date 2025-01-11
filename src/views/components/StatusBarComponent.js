var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
var StatusBarComponent = function () {
    var _a = useSelector(function (state) { return state.message; }), message = _a.message, messageType = _a.messageType, showStatusBar = _a.showStatusBar;
    var _b = __read(useState('hide'), 2), show = _b[0], setShow = _b[1];
    useEffect(function () {
        if (showStatusBar) {
            setShow('show');
            var timer_1 = setTimeout(function () {
                setShow('hide');
            }, 5000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [showStatusBar]);
    var minimize = function () {
        if (show == 'show') {
            setShow('hide');
        }
    };
    return (message && (_jsx("span", { className: "modal-overlay ".concat(show), children: _jsxs("div", { className: "status", children: [_jsx("span", { className: "close", children: _jsx("button", { onClick: minimize, children: _jsx("h3", { children: "X" }) }) }), _jsx("div", { className: "status-bar card ".concat(messageType), id: "status_bar", children: _jsx("span", { children: message }) })] }) })));
};
export default StatusBarComponent;
