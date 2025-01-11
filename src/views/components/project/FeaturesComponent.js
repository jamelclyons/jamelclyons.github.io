import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var FeaturesComponent = function (_a) {
    var features = _a.features;
    return (features.size > 0 && (_jsxs("div", { className: "product-features-card card", children: [_jsx("h3", { children: "Features" }), _jsx("div", { className: "product-features", children: Array.from(features).map(function (feature) { return (_jsx(_Fragment, { children: _jsx("p", { className: "feature-name", id: "feature_name", children: feature.name }) })); }) })] })));
};
export default FeaturesComponent;
