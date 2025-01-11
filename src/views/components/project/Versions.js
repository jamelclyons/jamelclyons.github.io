import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var Versions = function (_a) {
    var projectVersions = _a.projectVersions;
    return (_jsx(_Fragment, { children: !projectVersions.isEmpty ? (_jsxs("div", { className: "versions", children: [_jsxs("span", { className: "current-version", children: [_jsx("h4", { children: "Current Version" }), projectVersions.current] }), _jsxs("span", { className: "upcoming-versions", children: [_jsx("h4", { children: "Upcoming Versions" }), _jsx("table", { children: _jsx("tbody", {}) })] })] })) : ('') }));
};
export default Versions;
