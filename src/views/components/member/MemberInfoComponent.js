import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MemberBio from './MemberBio';
import Member from './Member';
var MemberInfoComponent = function (_a) {
    var user = _a.user;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "author-info", children: [user.bio && _jsx(MemberBio, { bio: user.bio }), _jsx(Member, { user: user })] }) }));
};
export default MemberInfoComponent;
