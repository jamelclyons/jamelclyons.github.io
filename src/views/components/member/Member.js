import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MemberContact from './MemberContact';
var Member = function (_a) {
    var user = _a.user;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "author-card card", children: [_jsx("div", { className: "author-pic", children: _jsx("img", { src: user === null || user === void 0 ? void 0 : user.avatarURL, alt: "" }) }), _jsx("h2", { className: "title", children: user === null || user === void 0 ? void 0 : user.title }), _jsx(MemberContact, { contactMethods: user.contactMethods })] }) }));
};
export default Member;
