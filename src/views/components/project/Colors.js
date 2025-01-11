import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var ColorsComponent = function (_a) {
    var colors = _a.colors;
    return (_jsx(_Fragment, { children: colors ? (_jsxs("div", { className: "colors", children: [_jsxs("h5", { className: "title", children: ["Colors (", colors.length, ")"] }), _jsx("div", { className: "color-row", children: Array.isArray(colors) &&
                        colors.map(function (colorObj, index) { return (_jsxs("div", { className: "color", children: [_jsx("span", { className: "color-square", style: { backgroundColor: colorObj.color } }), _jsx("h5", { children: colorObj.color })] }, index)); }) })] })) : ('') }));
};
export default ColorsComponent;
