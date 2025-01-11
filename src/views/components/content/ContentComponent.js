import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var ContentComponent = function (_a) {
    var html = _a.html;
    return _jsx(_Fragment, { children: html && html !== '' && _jsx("div", { className: 'card', dangerouslySetInnerHTML: { __html: html } }) });
};
export default ContentComponent;
