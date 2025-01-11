import { jsx as _jsx } from "react/jsx-runtime";
var DescriptionComponent = function (_a) {
    var description = _a.description;
    return (description && (_jsx("div", { className: "details-card card", children: _jsx("h4", { children: description }) })));
};
export default DescriptionComponent;
