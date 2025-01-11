import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var MemberBio = function (_a) {
    var bio = _a.bio;
    return (_jsx(_Fragment, { children: bio !== '' && (_jsx("div", { className: "author-bio-card card", children: _jsx("h3", { className: "author-bio", children: _jsx("q", { children: bio }) }) })) }));
};
export default MemberBio;
