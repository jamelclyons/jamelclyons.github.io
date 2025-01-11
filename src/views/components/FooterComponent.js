import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FooterBar from './FooterBar';
var FooterComponent = function (_a) {
    var contactMethods = _a.contactMethods;
    var year = new Date().getFullYear();
    return (_jsxs("footer", { children: [_jsx(FooterBar, { contactMethods: contactMethods }), _jsxs("span", { className: "legal", children: ["Copyright 2010 - ", year, ". All Rights Reserved."] })] }));
};
export default FooterComponent;
