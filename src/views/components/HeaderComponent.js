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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
var HeaderComponent = function (_a) {
    var name = _a.name;
    var _b = __read(useState('hide'), 2), dropdown = _b[0], setDropdown = _b[1];
    var toggleMenu = function () {
        if (dropdown == 'hide') {
            setDropdown('show');
        }
        else {
            setDropdown('hide');
        }
    };
    return (_jsx(_Fragment, { children: _jsx("header", { children: _jsxs("div", { className: "header", children: [_jsxs("div", { className: "top", children: [_jsxs("div", { className: "leftSide", children: [_jsx("div", { className: "auth" }), _jsxs("div", { className: "left-menu", id: "left-menu", children: [_jsx("a", { href: "/#/about", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "ABOUT" }) }), _jsx("a", { href: "/#/portfolio", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "PORTFOLIO" }) })] })] }), _jsx("div", { className: "center", children: _jsx("a", { href: "/", onClick: toggleMenu, children: _jsx("h1", { className: "title", children: name }) }) }), _jsxs("div", { className: "rightSide", children: [_jsxs("div", { className: "hamburger", id: "toggle", onClick: toggleMenu, children: [_jsx("h1", { className: "open", id: "open", children: "III" }), _jsx("h1", { className: "close", id: "close", children: "X" })] }), _jsxs("div", { className: "right-menu", id: "right-menu", children: [_jsx("a", { href: "/#/resume", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "RESUME" }) }), _jsx("a", { href: "/#/contact", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "CONTACT" }) })] })] })] }), dropdown == 'show' && (_jsx("nav", { className: "dropdown", id: "dropdown", children: _jsxs("ul", { className: "links", children: [_jsx("li", { children: _jsx("a", { href: "/#/about", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "ABOUT" }) }) }), _jsx("li", { children: _jsx("a", { href: "/#/portfolio", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "PORTFOLIO" }) }) }), _jsx("li", { children: _jsx("a", { href: "/#/resume", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "RESUME" }) }) }), _jsx("li", { children: _jsx("a", { href: "/#/contact", onClick: toggleMenu, children: _jsx("h2", { className: "title", children: "CONTACT" }) }) })] }) }))] }) }) }));
};
export default HeaderComponent;
