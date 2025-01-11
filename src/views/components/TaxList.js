import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var TaxList = function (_a) {
    var taxonomies = _a.taxonomies, title = _a.title;
    var handleClick = function (taxonomy) {
        window.location.href = "/#/projects/".concat(taxonomy.path, "/").concat(taxonomy.id);
    };
    return (taxonomies && (taxonomies === null || taxonomies === void 0 ? void 0 : taxonomies.size) > 0 && (_jsxs("div", { className: "tax-list", children: [_jsx("h4", { className: "title", children: title }), _jsx("div", { className: "tax-row", children: Array.from(taxonomies).map(function (taxonomy, index) {
                    return taxonomy && taxonomy.title ? (_jsx("button", { className: "tag", onClick: function () { return handleClick(taxonomy); }, children: _jsx("h3", { children: taxonomy.title }) }, index)) : null;
                }) })] })));
};
export default TaxList;
